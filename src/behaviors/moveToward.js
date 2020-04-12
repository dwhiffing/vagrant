import { wrapNumber } from '../utils'

export const MOVE_TOWARD_TARGET = {
  options: {
    speed: 550,
    turnRate: 5,
    wobbleLimit: 0,
    wobbleSpeed: 0,
    stallTimeout: 0,
    dampenSpeed: false,
    getAvoidGroup: null,
  },

  $create: function (entity, opts) {
    entity.stallSpeed = 1
    entity.wobble = opts.wobbleLimit
    entity.stallTimeout = opts.stallTimeout
    entity.turnRate = opts.turnRate
    entity.dampenSpeed = opts.dampenSpeed
    entity.speed = opts.speed
    entity.target = opts.target
    entity.getAvoidGroup = opts.getAvoidGroup

    if (opts.wobbleLimit > 0) {
      entity.scene.tweens.addCounter({
        from: opts.wobbleLimit,
        to: -opts.wobbleLimit,
        ease: 'Sine.easeInOut',
        duration: opts.wobbleSpeed,
        loop: -1,
        yoyo: true,
        onUpdate: (tween) => {
          entity.wobble = tween.getValue()
        },
      })
    }

    entity.stall = () => {
      if (entity.preventStall) {
        return
      }

      entity.preventStall = true

      entity.scene.tweens.addCounter({
        from: entity.stallSpeed,
        to: 0,
        duration: 500,
        onComplete: () => {
          entity.stalled = true
          entity.turnCounter = 0
          entity.emit('stall')
        },
        onUpdate: (tween) => (entity.stallSpeed = tween.getValue()),
      })

      entity.scene.time.addEvent({
        delay: 2000,
        callback: () => {
          entity.stalled = false
          entity.emit('unstall')

          entity.scene.tweens.addCounter({
            from: entity.stallSpeed,
            to: 1,
            duration: 500,
            onUpdate: (tween) => (entity.stallSpeed = tween.getValue()),
          })
        },
      })

      entity.scene.time.addEvent({
        delay: 3000,
        callback: () => (entity.preventStall = false),
      })
    }
  },

  update(entity) {
    if (!entity.active || !entity.target.active) {
      return
    }

    const { x, y } = entity.target
    let targetAngle = Phaser.Math.Angle.Between(entity.x, entity.y, x, y)

    if (typeof entity.wobble === 'number') {
      targetAngle += Phaser.Math.DegToRad(entity.wobble)
    }

    if (entity.getAvoidGroup) {
      const closeMissle = entity
        .getAvoidGroup()
        .getChildren()
        .find(
          (m) =>
            m !== entity &&
            Phaser.Math.Distance.Between(entity.x, entity.y, m.x, m.y) < 40,
        )

      if (closeMissle) {
        targetAngle += Math.random() > 0.5 ? Math.PI / 2 : Math.PI / -2
      }
    }

    const rDelta = wrapNumber(targetAngle - entity.rotation, -Math.PI, Math.PI)
    const opposite = rDelta > 0 ? 1 : 0

    if (!entity.stalled) {
      entity.angle += rDelta > 0 ? entity.turnRate : -entity.turnRate

      if (Math.abs(rDelta) < Phaser.Math.DegToRad(entity.turnRate)) {
        entity.rotation = targetAngle
      }

      if (entity.turnCounterDirection === opposite) {
        entity.turnCounter = 0
      }

      entity.turnCounterDirection = rDelta > 0 ? 0 : 1

      if (
        entity.stallTimeout > 0 &&
        entity.turnCounter++ > entity.stallTimeout
      ) {
        entity.stall()
      }
    }

    const speed =
      (entity.dampenSpeed > 0
        ? Math.max(1 - Math.abs(rDelta), entity.dampenSpeed)
        : 1) *
      entity.speed *
      entity.stallSpeed

    const distance = Phaser.Math.Distance.Between(entity.x, entity.y, x, y)
    if (distance < entity.speed * 0.05) {
      entity.body.velocity.x = 0
      entity.body.velocity.y = 0
    } else {
      entity.body.velocity.x = Math.cos(entity.rotation) * speed
      entity.body.velocity.y = Math.sin(entity.rotation) * speed
    }
  },
}
