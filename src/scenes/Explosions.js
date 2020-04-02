import { Explosion } from './Explosion'
export class Explosions extends Phaser.Physics.Arcade.Group {
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
