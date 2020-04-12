export class Explosions extends Phaser.Physics.Arcade.Group {
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
