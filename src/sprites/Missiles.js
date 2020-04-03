import { Missile } from './Missile'

export class Missiles extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene)
    this.activeX = 300
    this.activeY = 300

    this.scene.input.on('pointermove', pointer => {
      this.activeX = pointer.x
      this.activeY = pointer.y
    })

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
      this.fireMissile(x, y)
    }
  }
}
