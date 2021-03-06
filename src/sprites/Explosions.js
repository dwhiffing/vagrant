export class Explosions extends Phaser.Physics.Arcade.Group {
  constructor(scene, opts = { key, scale: 1 }) {
    super(scene.physics.world, scene)
    this.createMultiple({
      frameQuantity: 1,
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
  makeExplosion(x, y, scale = this.scale) {
    let explosion = this.getFirstDead()
    if (explosion) {
      explosion.spawn(x, y)
      explosion.scale = scale
    }
  }
}

export class Explosion extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key)
    this.thingKey = key
    this.anim = this.scene.anims.create({
      key: key,
      frames: this.scene.anims.generateFrameNumbers(key),
      frameRate: 20,
    })
  }
  spawn(x, y) {
    this.body.reset(x, y)
    this.enableBody()
    this.setActive(true)
    this.setVisible(true)
    this.anims.load(this.thingKey)
    this.angle = Phaser.Math.RND.between(0, 360)
    this.anims.play(this.thingKey)
    this.once('animationcomplete', () => {
      this.disableBody()
      this.setVisible(false)
      this.setActive(false)
    })
  }
}
