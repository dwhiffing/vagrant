import { Rock } from './Rock'

export class Rocks extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene)
    this.createMultiple({
      frameQuantity: 20,
      key: 'rock',
      active: false,
      visible: false,
      classType: Rock,
      setXY: { x: -100, y: -100 },
    })

    this.scene.time.addEvent({
      delay: 1000,
      callback: this.spawn,
      callbackScope: this,
      loop: true,
    })
  }

  spawn() {
    const containerWidth = this.scene.cameras.main.width
    const containerHeight = this.scene.cameras.main.height
    let x = Phaser.Math.RND.between(200, containerWidth - 200)
    let y = Math.random() < 0.5 ? containerHeight + 200 : -200

    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? containerWidth + 200 : -200
      y = Phaser.Math.RND.between(200, containerHeight - 200)
    }
    let bullet = this.getFirstDead(false)
    if (bullet) {
      bullet.fire(x, y)
    }
  }
}
