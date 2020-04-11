import { wrapNumber } from '../utils'

export const MOVE_TOWARD_TARGET = {
  options: {
    speed: 550,
    turnRate: 5,
    wobbleLimit: 15,
    wobbleSpeed: 1000,
  },

  $create: function (entity, opts) {
    entity.stallSpeed = 1
    entity.wobble = opts.wobbleLimit
    entity.turnRate = opts.turnRate
    entity.speed = opts.speed
    entity.target = opts.target || entity.scene.input.activePointer

    entity.scene.tweens.addCounter({
      from: -opts.wobbleLimit,
      to: opts.wobbleLimit,
      duration: opts.wobbleSpeed,
      loop: -1,
      onUpdate: (tween) => {
        entity.wobble = tween.getValue()
      },
    })

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
    if (!entity.active) {
      return
    }

    const { x, y } = entity.target
    let targetAngle = Phaser.Math.Angle.Between(entity.x, entity.y, x, y)

    targetAngle += Phaser.Math.DegToRad(entity.wobble)

    const closeMissle = entity.scene.missileGroup
      .getChildren()
      .find(
        (m) =>
          m !== entity &&
          Phaser.Math.Distance.Between(entity.x, entity.y, m.x, m.y) < 30,
      )

    if (closeMissle) {
      targetAngle += Math.random() > 0.5 ? Math.PI / 2 : Math.PI / -2
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

      if (entity.turnCounter++ > 120) {
        entity.stall()
      }
    }

    const speed =
      Math.max(1 - Math.abs(rDelta), 0.5) * entity.speed * entity.stallSpeed

    entity.body.velocity.x = Math.cos(entity.rotation) * speed
    entity.body.velocity.y = Math.sin(entity.rotation) * speed
  },
}

export const MOVE_TOWARD_MOUSE = {
  options: {
    speed: 1000,
  },

  $create: function (entity, opts) {
    entity.speed = opts.speed
  },

  update(entity) {
    if (!entity.active) {
      return
    }

    const { x, y } = entity.scene.input.activePointer
    const distance = Phaser.Math.Distance.Between(entity.x, entity.y, x, y)
    if (distance < entity.speed * 0.05) {
      entity.body.velocity.x = 0
      entity.body.velocity.y = 0
    } else {
      const targetAngle = Phaser.Math.Angle.Between(entity.x, entity.y, x, y)
      entity.body.velocity.x = Math.cos(targetAngle) * entity.speed
      entity.body.velocity.y = Math.sin(targetAngle) * entity.speed
    }
  },
}
