import { Explosions } from '../sprites/Explosions'

const withinDistance = (entity, other, distance) =>
  Phaser.Math.Distance.Between(entity.x, entity.y, other.x, other.y) < distance

export const EXPLODE = {
  options: {
    getTargets: () => ({}),
    explosionDelay: 0,
    explosionDamage: 20,
    triggerRadius: 50,
    explosionRadius: 50,
  },

  $create: function (entity, opts) {
    entity.radius = opts.explosionRadius
    entity.triggerRadius = opts.triggerRadius
    entity.explosionDelay = opts.explosionDelay
    entity.explosionDamage = opts.explosionDamage
    entity.getTargets = opts.getTargets
    entity.explosionGroup = new Explosions(entity.scene, {
      scale: opts.explosionRadius / 20,
      key: 'explosion-3',
    })

    entity.on('kill', (opts) => {
      entity.explosionGroup.makeExplosion(entity.x, entity.y)
      if (opts.shouldDamage) {
        entity
          .getTargets()
          .filter((target) => withinDistance(entity, target, entity.radius))
          .forEach((target) => target.damage(entity.explosionDamage))
      }
    })
  },

  update: function (entity) {
    if (!entity.active) return

    if (
      entity
        .getTargets()
        .filter((target) =>
          withinDistance(entity, target, entity.triggerRadius),
        ).length === 0
    )
      return

    entity.scene.time.addEvent({
      delay: entity.explosionDelay,
      callback: () => entity.kill({ shouldDamage: true }),
    })
  },
}
