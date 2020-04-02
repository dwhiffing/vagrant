import { Missile } from './Missile'
export class Missiles extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene)
    this.createMultiple({
      frameQuantity: 20,
      key: 'rocket',
      active: false,
      visible: false,
      classType: Missile,
      setXY: {
        x: -100,
        y: -100,
      },
    })
  }
  fireMissile(x, y) {
    let bullet = this.getFirstDead(false)
    if (bullet) {
      bullet.fire(x, y)
    }
  }
}
