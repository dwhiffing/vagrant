import { Mine } from './Mine'

export class Mines extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene)
    this.createMultiple({
      frameQuantity: 20,
      key: 'mine',
      active: false,
      visible: false,
      classType: Mine,
      setXY: {
        x: -100,
        y: -100,
      },
    })
  }

  spawn(x, y) {
    if (this.countActive(true) < 10) {
      let mine = this.getFirstDead(false)
      if (mine) {
        mine.body.reset(x, y)
        mine.setActive(true)
        mine.setVisible(true)
      }
    }
  }
}
