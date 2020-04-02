export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' })
  }

  preload() {
    const progress = this.add.graphics()
    this.load.on('progress', value => {
      progress.clear()
      progress.fillStyle(0xffffff, 1)
      progress.fillRect(
        0,
        this.sys.game.config.height / 2,
        this.sys.game.config.width * value,
        60,
      )
    })

    this.load.image('rocket', '/assets/images/rocket.png')
    this.load.image('smoke', '/assets/images/smoke.png')

    this.load.spritesheet('explosion', '/assets/images/explosion.png', {
      frameWidth: 128,
      frameHeight: 128,
    })

    this.load.on('complete', () => {
      progress.destroy()
      this.scene.start('Game')
    })
  }
}
