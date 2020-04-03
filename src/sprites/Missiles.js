import { Missile } from './Missile'

const AVOID_DISTANCE = 30

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

  getClosest(missile) {
    return this.getChildren().find(
      m =>
        m !== missile &&
        Phaser.Math.Distance.Between(missile.x, missile.y, m.x, m.y) <
          AVOID_DISTANCE,
    )
  }

  spawn() {
    if (this.countActive(true) < 1) {
      const containerWidth = this.scene.cameras.main.width
      const containerHeight = this.scene.cameras.main.height
      let x = Phaser.Math.RND.between(50, containerWidth - 50)
      let y = Math.random() < 0.5 ? containerHeight + 50 : -50

      if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? containerWidth + 50 : -50
        y = Phaser.Math.RND.between(50, containerHeight - 50)
      }
      let bullet = this.getFirstDead(false)
      if (bullet) {
        bullet.fire(x, y)
      }
    }
  }
}
