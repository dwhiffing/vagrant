import { wrapNumber } from '../utils'

export const MOVE_TOWARD_TARGET = {
  options: {
    speed: 550,
    turnRate: 5,
    getShouldAvoid: null,
  },

  $create: function (entity, opts) {
    entity.stallSpeed = 1
    entity.turnRate = opts.turnRate
    entity.speed = opts.speed
    entity.target = opts.target
    entity.getShouldAvoid = opts.getShouldAvoid
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

    if (entity.getShouldAvoid && entity.getShouldAvoid()) {
      targetAngle += Math.random() > 0.5 ? Math.PI / 2 : Math.PI / -2
    }

    entity.rDelta = wrapNumber(targetAngle - entity.rotation, -Math.PI, Math.PI)

    if (!entity.stalled) {
      entity.angle += entity.rDelta > 0 ? entity.turnRate : -entity.turnRate

      if (Math.abs(entity.rDelta) < Phaser.Math.DegToRad(entity.turnRate)) {
        entity.rotation = targetAngle
      }
    }

    if (entity.shieldSprite) {
      entity.shieldSprite.x = entity.x
      entity.shieldSprite.y = entity.y
      entity.shieldSprite.angle = entity.angle + 90
    }

    const speed = entity.speed * entity.stallSpeed
    const distance = Phaser.Math.Distance.Between(entity.x, entity.y, x, y)
    const velocity = distance < entity.speed * 0.05 ? 0 : speed
    entity.body.velocity.x = Math.cos(entity.rotation) * velocity
    entity.body.velocity.y = Math.sin(entity.rotation) * velocity
  },
}
