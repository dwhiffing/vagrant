export class Bot extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bot')
    this.setOrigin(0.5, 0.5)
    this.setScale(0.5)
    this.setActive(true)
    this.setVisible(true)
    scene.events.on('update', (time, delta) => {
      this.update(time, delta)
    })
  }

  destroy() {
    this.emit('destroy')
    this.setActive(false)
    this.setVisible(false)
  }

  update() {
    this.x = this.scene.input.x
    this.y = this.scene.input.y
  }
}
