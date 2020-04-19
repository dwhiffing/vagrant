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
    explosionKey: 'explosion-2',
    explosionSound: 'explosion3',
    getShouldExplode: () => true,
  },

  $create: function (entity, opts) {
    entity.explosionRadius = opts.explosionRadius
    entity.triggerRadius = opts.triggerRadius
    entity.explosionDelay = opts.explosionDelay
    entity.explosionDamage = opts.explosionDamage
    entity.getShouldExplode = opts.getShouldExplode
    entity.getTargets = opts.getTargets
    entity.explosionSound = entity.scene.sound.add(opts.explosionSound, {
      volume: 1.2,
    })
    entity.explosionGroup = new Explosions(entity.scene, {
      scale:
        opts.explosionRadius /
        (opts.explosionKey === 'explosion'
          ? 80
          : opts.explosionKey === 'explosion-2'
          ? 20
          : 30),
      key: opts.explosionKey,
    })

    entity.on('kill', (opts = {}) => {
      entity.explosionGroup.makeExplosion(
        entity.x,
        entity.y,
        Math.max(4, (entity.explosionRadius || 30) / 30),
      )
      if (entity.explosionShake) {
        entity.scene.events.emit('shake', { type: 'small' })
      }
      entity.explosionSound.play()
      if (opts.shouldDamage) {
        entity
          .getTargets()
          .filter((target) =>
            withinDistance(entity, target, entity.explosionRadius),
          )
          .forEach((target) =>
            target.damage(entity.explosionDamage, false, true),
          )
      }
    })
  },

  update: function (entity) {
    if (!entity.active) return
    const targets = entity
      .getTargets()
      .filter((target) => withinDistance(entity, target, entity.triggerRadius))

    if (targets.length === 0) return
    if (!entity.getShouldExplode()) return

    entity.scene.time.addEvent({
      delay: entity.explosionDelay,
      callback: () => {
        entity.kill({ shouldDamage: true })
      },
    })
  },
}
