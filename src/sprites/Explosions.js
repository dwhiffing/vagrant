export class Explosions extends Phaser.Physics.Arcade.Group {
  constructor(scene, opts = { key, scale: 1 }) {
    super(scene.physics.world, scene)
    console.log(opts.key)
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
  makeExplosion(x, y) {
    let explosion = this.getFirstDead(false)
    if (explosion) {
      explosion.fire(x, y)
      explosion.scale = this.scale
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
  fire(x, y) {
    this.body.reset(x, y)
    this.setActive(true)
    this.setVisible(true)
    this.anims.load(this.thingKey)
    this.angle = Phaser.Math.RND.between(0, 360)
    this.anims.play(this.thingKey)
    this.once('animationcomplete', () => {
      this.setVisible(false)
      this.setActive(false)
    })
  }
}
