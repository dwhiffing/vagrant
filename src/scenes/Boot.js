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

    this.load.image('background', '/assets/images/background2.gif')
    this.load.image('bot', '/assets/images/ufoGreen.png')
    this.load.image('mine', '/assets/images/mine.png')
    this.load.image('target', '/assets/images/target.png')
    this.load.image('missile', '/assets/images/missile.png')
    this.load.image('smoke', '/assets/images/smoke2.png')

    this.load.spritesheet('explosion', '/assets/images/explosion.png', {
      frameWidth: 128,
      frameHeight: 128,
    })

    this.load.spritesheet('explosion-2', '/assets/images/explosion-2.png', {
      frameWidth: 32,
      frameHeight: 32,
    })

    this.load.spritesheet('explosion-3', '/assets/images/explosion-3.png', {
      frameWidth: 48,
      frameHeight: 48,
    })

    this.load.on('complete', () => {
      progress.destroy()
      this.scene.start('Game')
    })
  }
}
