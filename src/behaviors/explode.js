import { Explosion } from '../sprites/Explosion'

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
    entity.explosionGroup = new Explosions(entity.scene, {
      scale: opts.explosionRadius / 20,
      key: 'explosion-3',
    })
    entity.getTargets = opts.getTargets
  },

  update: function (entity, opts, game, dt) {
    if (!entity.active) return
    const withinTriggerRadius = entity
      .getTargets()
      .filter((t) => withinDistance(entity, t, opts.triggerRadius))

    if (withinTriggerRadius.length === 0) return

    entity.setActive(false)
    entity.scene.time.addEvent({
      delay: opts.explosionDelay,
      callback: () => {
        entity.explosionGroup.makeExplosion(entity.x, entity.y)
        entity.destroy()
        entity.getTargets().forEach((target) => {
          target.damage && target.damage()
        })
        if (opts.destroyTargets) {
          entity
            .getTargets()
            .filter((t) => withinDistance(entity, t, opts.explosionRadius))
            .forEach((t) => t.destroy())
        }
      },
    })
  },
}

class Explosions extends Phaser.Physics.Arcade.Group {
  constructor(scene, opts = { key: 'explosion-3', scale: 1 }) {
    super(scene.physics.world, scene)
    this.createMultiple({
      frameQuantity: 5,
      key: opts.key,
      active: false,
      visible: false,
      classType: Explosion,
      setXY: {
        x: -100,
        y: -100,
      },
    })
    this.scale = opts.scale
  }
  makeExplosion(x, y) {
    let explosion = this.getFirstDead(false)
    if (explosion) {
      explosion.fire(x, y)
      explosion.scale = this.scale
    }
  }
}
