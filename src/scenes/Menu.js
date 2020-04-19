export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Menu' })
  }

  init(opts = {}) {
    this.score = opts.score || 0
  }

  create() {
    const { height, width } = this.game.config

    // this.sound.mute = true

    this.music = this.sound.add('title', { loop: true, volume: 0.4 })
    this.music.play()

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

    if (this.score === 0)
      this.add.sprite(width / 2, height / 2, 'bot').setScale(1.5)

    this.add
      .sprite(width / 2, height - 420, 'button')
      .setScale(1.2)
      .setInteractive()
      .on('pointerdown', () => {
        this.music.stop()
        this.scene.start('Game', { lives: 3 })
        if (/Mobi/.test(navigator.userAgent)) {
          this.scale.startFullscreen()
        }
      })

    this.add
      .sprite(width / 2, height - 220, 'button')
      .setScale(1.2)
      .setFrame(1)
      .setInteractive()
      .on('pointerdown', () => {
        if (/Mobi/.test(navigator.userAgent)) {
          this.scale.startFullscreen()
        }
        this.scene.launch('Credits')
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
