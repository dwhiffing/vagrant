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

    this.load.audio('game', 'assets/audio/game.mp3')
    this.load.audio('title', 'assets/audio/title.mp3')

    this.load.audio('placeMine', 'assets/audio/place-mine.mp3')
    this.load.audio('noMines', 'assets/audio/no-mines.mp3')

    this.load.audio('explosion1', 'assets/audio/explosion1.mp3')
    this.load.audio('explosion2', 'assets/audio/explosion2.mp3')
    this.load.audio('explosion3', 'assets/audio/explosion3.mp3')

    this.load.audio('botHit1', 'assets/audio/bot-hit1.mp3')
    this.load.audio('shieldHit1', 'assets/audio/shield-hit1.mp3')
    this.load.audio('death', 'assets/audio/death.mp3')

    this.load.audio('enemyHit1', 'assets/audio/enemy-hit1.mp3') // TOOD: unused
    this.load.audio('enemyHit2', 'assets/audio/enemy-hit2.mp3') // TOOD: unused
    this.load.audio('enemyHit3', 'assets/audio/enemy-hit3.mp3') // TOOD: unused

    this.load.audio('itemAppears', 'assets/audio/powerup-appears.mp3')
    this.load.audio('itemPickup', 'assets/audio/powerup-starts.mp3')
    this.load.audio('itemExpires', 'assets/audio/powerup-expires.mp3') // TODO: unused

    this.load.image('background', 'assets/images/background2.gif')
    this.load.image('bot', 'assets/images/ufoGreen.png')
    this.load.image('mine', 'assets/images/mine.png')
    this.load.image('target', 'assets/images/target.png')
    this.load.image('button', 'assets/images/button.png')
    this.load.image('title', 'assets/images/title.png')
    this.load.image('smoke', 'assets/images/smoke2.png')
    this.load.image('healthBar', 'assets/images/health-bar.png')
    this.load.image('healthBarIn', 'assets/images/health-bar-in.png')
    this.load.image('shieldBar', 'assets/images/shield-bar.png')
    this.load.image('shield', 'assets/images/shield.png')
    this.load.image('shieldBarIn', 'assets/images/shield-bar-in.png')
    this.load.image('powerBar', 'assets/images/power-bar.png')
    this.load.image('powerBarIn', 'assets/images/power-bar-in.png')
    this.load.spritesheet('life', 'assets/images/life.png', {
      frameWidth: 25,
      frameHeight: 25,
    })
    this.load.spritesheet('icon', 'assets/images/icons.png', {
      frameWidth: 100,
      frameHeight: 100,
    })

    this.load.spritesheet('item', 'assets/images/items.png', {
      frameWidth: 50,
      frameHeight: 50,
    })

    this.load.spritesheet('missile', 'assets/images/missile.png', {
      frameWidth: 100,
      frameHeight: 100,
    })

    this.load.spritesheet('explosion', 'assets/images/explosion.png', {
      frameWidth: 32,
      frameHeight: 32,
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
