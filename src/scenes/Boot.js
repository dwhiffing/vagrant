export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' })
  }

  preload() {
    const progress = this.add.graphics()
    this.load.on('progress', (value) => {
      progress.clear()
      progress.fillStyle(0xffffff, 1)
      progress.fillRect(
        0,
        this.sys.game.config.height / 2,
        this.sys.game.config.width * value,
        60,
      )
    })
    this.load.script(
      'webfont',
      'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
    )

    this.load.image('background', 'assets/images/background2.gif')
    this.load.image('bot', 'assets/images/ufoGreen.png')
    this.load.image('mine', 'assets/images/mine.png')
    this.load.image('target', 'assets/images/target.png')
    this.load.image('title', 'assets/images/title.png')
    this.load.image('smoke', 'assets/images/smoke2.png')
    this.load.image('healthBar', 'assets/images/health-bar.png')
    this.load.image('healthBarIn', 'assets/images/health-bar-in.png')
    this.load.spritesheet('life', 'assets/images/life.png', {
      frameWidth: 25,
      frameHeight: 25,
    })

    this.load.spritesheet('missile', 'assets/images/missile.png', {
      frameWidth: 100,
      frameHeight: 100,
    })

    this.load.spritesheet('explosion', 'assets/images/explosion.png', {
      frameWidth: 128,
      frameHeight: 128,
    })

    this.load.spritesheet('explosion-2', 'assets/images/explosion-2.png', {
      frameWidth: 32,
      frameHeight: 32,
    })

    this.load.spritesheet('explosion-3', 'assets/images/explosion-3.png', {
      frameWidth: 48,
      frameHeight: 48,
    })

    this.load.spritesheet('rock', 'assets/images/rock.png', {
      frameWidth: 100,
      frameHeight: 100,
    })

    this.load.on('complete', () => {
      WebFont.load({
        google: {
          families: ['Space Mono'],
        },
        active: () => {
          progress.destroy()
          this.scene.start('Menu')
        },
      })
    })
  }
}
