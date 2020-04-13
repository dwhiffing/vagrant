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
    const x = Math.random() < 0.5 ? containerWidth + 80 : -80
    const y = Phaser.Math.RND.between(80, containerHeight - 80)
    let bullet = this.getFirstDead(false)
    if (bullet) {
      bullet.fire(x, y)
    }
  }
}
