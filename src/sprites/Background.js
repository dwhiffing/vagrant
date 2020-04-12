export class Background extends Phaser.GameObjects.TileSprite {
  constructor(scene, width, height) {
    super(scene, width / 2, height / 2, width, height, 'background')
    this.setActive(true)
    this.setVisible(true)
    this.tileScaleX = 3.5
    this.tileScaleY = 3.5
    this.iter = 0
  }

  update() {
    this.tilePositionX = Math.cos(this.iter) * 100
    this.tilePositionY -= 0.8
    this.iter += 0.001
  }
}
