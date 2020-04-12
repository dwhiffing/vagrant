export class Target extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'target')
    this.setActive(true)
    this.setVisible(true)
    this.setScale(2)
    scene.physics.world.enable(this)
    this.body.setCollideWorldBounds(true)
  }
}
