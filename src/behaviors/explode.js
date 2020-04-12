import { Explosions } from '../sprites/Explosions'

const withinDistance = (entity, other, distance) =>
  Phaser.Math.Distance.Between(entity.x, entity.y, other.x, other.y) < distance

export const EXPLODE = {
  options: {
    getTargets: () => ({}),
    destroyTarget: false,
    explosionDelay: 0,
    triggerRadius: 50,
    explosionRadius: 50,
  },

  $create: function (entity, opts) {
    entity.radius = opts.explosionRadius
    entity.triggerRadius = opts.triggerRadius
    entity.getTargets = opts.getTargets
    entity.explosionGroup = new Explosions(entity.scene, {
      scale: opts.explosionRadius / 20,
      key: 'explosion-3',
    })

    entity.explode = ({ explosionDelay }) => {
      entity.setActive(false)
      entity.scene.time.addEvent({
        delay: explosionDelay,
        callback: () => {
          entity.explosionGroup.makeExplosion(entity.x, entity.y)
          entity.destroy()

          entity
            .getTargets()
            .filter((target) => withinDistance(entity, target, entity.radius))
            .forEach((target) => target.damage())
        },
      })
    }
  },

  update: function (entity, opts) {
    if (!entity.active) return

    if (
      entity
        .getTargets()
        .filter((target) =>
          withinDistance(entity, target, entity.triggerRadius),
        ).length === 0
    )
      return

    entity.explode(opts)
  },
}
