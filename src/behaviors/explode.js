import { Explosion } from '../sprites/Explosion'

export const EXPLODE = {
  options: {
    angle: 0,
    speed: 100,
    rotate: true,
  },

  $create: function(entity) {
    entity.explosionGroup = new Explosions(entity.scene)
  },

  update: function(entity, opts, game, dt) {
    const { x, y } = entity.scene.input.activePointer
    const missileGroup = entity.scene.missileGroup
    missileGroup
      .getChildren()
      .filter(s => s.active)
      .forEach(function(m) {
        const distance = Phaser.Math.Distance.Between(m.x, m.y, x, y)
        if (distance < 50) {
          m.destroy()
          entity.explosionGroup.makeExplosion(m.x, m.y)
        }
      }, missileGroup)
  },
}

class Explosions extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene)
    this.createMultiple({
      frameQuantity: 5,
      key: 'explosion',
      active: false,
      visible: false,
      classType: Explosion,
      setXY: {
        x: -100,
        y: -100,
      },
    })
  }
  makeExplosion(x, y) {
    let explosion = this.getFirstDead(false)
    if (explosion) {
      explosion.fire(x, y)
    }
  }
}
