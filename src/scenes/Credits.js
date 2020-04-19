export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Credits' })
  }

  init(opts = {}) {
    this.score = opts.score || 0
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

    // TODO: write instructions
    this.helpText = this.add
      .text(
        width / 2,
        height / 2,
        'In order to play\nfirst do this\nthen do that',
        {
          fontFamily: 'Space Mono',
          fontSize: 48,
          align: 'center',
          color: '#ffffff',
        },
      )
      .setShadow(2, 2, '#333333', 2, false, true)
    this.helpText.setOrigin(0.5)

    this.creditText = this.add
      .text(
        width / 2,
        height - 450,
        'Concept & Code: Daniel Whiffing\n\nArt & SFX: Kenney.nl\n\nMusic: Purple Planet',
        {
          fontFamily: 'Space Mono',
          fontSize: 32,
          align: 'center',
          color: '#ffffff',
        },
      )
      .setShadow(2, 2, '#333333', 2, false, true)
    this.creditText.setOrigin(0.5)

    this.add
      .sprite(width / 2, height - 220, 'button')
      .setScale(1.2)
      .setFrame(2)
      .setInteractive()
      .on('pointerdown', () => {
        if (this.scene.isPaused('Game')) {
          this.scene.resume('Game')
          this.scene.stop()
        } else {
          this.scene.stop()
        }
      })

    this.mute = this.add.image(
      this.cameras.main.width - 150,
      this.cameras.main.height - 150,
      'icon',
    )
    this.mute.setOrigin(0)
    this.mute.setFrame(1)
    this.mute.setFrame(this.sound.mute ? 2 : 1)
    this.mute.setInteractive().on('pointerdown', () => {
      this.sound.mute = !this.sound.mute
      this.mute.setFrame(this.sound.mute ? 1 : 2)
    })
  }
}
