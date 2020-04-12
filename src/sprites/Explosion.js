export class Explosion extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'explosion-3')
    this.anim = this.scene.anims.create({
      key: 'boom',
      frames: this.scene.anims.generateFrameNumbers('explosion-2'),
      frameRate: 20,
    })
  }
  fire(x, y) {
    this.body.reset(x, y)
    this.setActive(true)
    this.setVisible(true)
    this.anims.load('boom')
    this.angle = Phaser.Math.RND.between(0, 360)
    this.anims.play('boom')
    this.once('animationcomplete', () => {
      this.setVisible(false)
      this.setActive(false)
    })
  }
}
