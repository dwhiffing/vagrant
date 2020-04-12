export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' })
  }

  init(opts = {}) {
    this.score = opts.score
  }

  create() {
    const { height, width } = this.game.config

    this.background = this.add.tileSprite(
      width / 2,
      height / 2,
      width,
      height,
      'background',
    )
    this.background.tileScaleX = 3.5
    this.background.tileScaleY = 3.5

    this.title = this.add.image(width / 2, 100, 'title')
    this.title.setOrigin(0.5, 0)
    this.title.setScale(0.65)

    if (this.score) {
      this.scoreText = this.add
        .text(width / 2, height / 2, `Score: ${this.score}`, {
          fontFamily: 'Space Mono',
          fontSize: 100,
          align: 'center',
          color: '#ffffff',
        })
        .setShadow(2, 2, '#333333', 2, false, true)
      this.scoreText.setOrigin(0.5)
    }

    this.add
      .sprite(width / 2, height - 300, 'bot')
      .setScale(1.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('Game', { lives: 3 })
      })
  }
}
