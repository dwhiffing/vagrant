export class Interface {
  constructor(scene, lives, score) {
    const { width } = scene.game.canvas
    this.lives = lives || 3
    this.scene = scene
    this.score = score || 0

    this.healthBar = scene.add.image(20, 20, 'healthBar')
    this.healthBar.setOrigin(0)
    this.healthBar.setScale(2.5)
    this.healthBar.setDepth(9)

    this.healthBarIn = scene.add.image(43, 39, 'healthBarIn')
    this.healthBarIn.setOrigin(0)
    this.healthBarIn.setScale(2.5)
    this.healthBarIn.setDepth(10)

    this.shieldBar = scene.add.image(20, 110, 'shieldBar')
    this.shieldBar.setOrigin(0)
    this.shieldBar.setScale(2.4, 2)
    this.shieldBar.setDepth(9)

    this.shieldBarIn = scene.add.image(43, 120, 'shieldBarIn')
    this.shieldBarIn.setOrigin(0)
    this.shieldBarIn.setScale(2.2, 1.8)
    this.shieldBarIn.setDepth(10)
    this.shieldBar.setVisible(false)
    this.shieldBarIn.setVisible(false)

    this.powerBar = scene.add.image(width - 220, 100, 'powerBar')
    this.powerBar.setOrigin(0)
    this.powerBar.setScale(2.5)
    this.powerBar.setDepth(9)

    this.powerBarIn = scene.add.image(width - 200, 118, 'powerBarIn')
    this.powerBarIn.setOrigin(0)
    this.powerBarIn.setScale(2.5)
    this.powerBarIn.setDepth(10)
    this.powerBar.setVisible(false)
    this.powerBarIn.setVisible(false)

    this.mute = scene.add.image(
      this.scene.cameras.main.width - 150,
      this.scene.cameras.main.height - 150,
      'icon',
    )
    this.mute
      .setDepth(10)
      .setOrigin(0)
      .setFrame(this.scene.sound.mute ? 2 : 1)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.sound.mute = !this.scene.sound.mute
        this.mute.setFrame(this.scene.sound.mute ? 1 : 2)
      })

    this.pause = scene.add.image(
      50,
      this.scene.cameras.main.height - 150,
      'icon',
    )
    this.pause
      .setDepth(10)
      .setOrigin(0)
      .setFrame(0)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.scene.pause()
        this.scene.scene.launch('Credits')
      })

    this.life1 = scene.add.image(width - 1 * 85 - 10, 20, 'life')
    this.life1.setScale(3).setOrigin(0)
    this.life2 = scene.add.image(width - 2 * 85 - 10, 20, 'life')
    this.life2.setScale(3).setOrigin(0)
    this.life3 = scene.add.image(width - 3 * 85 - 10, 20, 'life')
    this.life3.setScale(3).setOrigin(0)
    if (this.lives < 3) {
      this.life3.setFrame(1)
    }
    if (this.lives < 2) {
      this.life2.setFrame(1)
    }
    this.life1.setDepth(10)
    this.life2.setDepth(10)
    this.life3.setDepth(10)

    this.scene.events.on('score', (opts) => {
      this.score += opts.amount
      if (this.scoreText.frame.data) {
        this.scoreText.text = `${this.score}`
      }
    })

    this.scene.events.on('wave', (opts) => {
      if (this.waveText.frame.data) {
        this.waveText.text = `${this.scene.totalWaves}`
      }
    })

    this.scene.events.on('health', (opts) => {
      this.healthBarIn.scaleX = 2.5 * (opts.health / 100)
    })

    this.scene.events.on('shield', (opts) => {
      this.shieldBarIn.scaleX = 2.2 * (opts.shield / 100)
      this.shieldBar.setVisible(opts.shield > 0)
      this.shieldBarIn.setVisible(opts.shield > 0)
    })

    this.scene.events.on('power', (opts) => {
      this.powerBarIn.scaleX = 2.5 * (opts.power / 100)
      this.powerBar.setVisible(opts.power > 0)
      this.powerBarIn.setVisible(opts.power > 0)
    })

    this.scene.events.on('loseLife', () => {
      this.lives -= 1

      if (this.lives < 3) {
        this.life3.setFrame(1)
      }
      if (this.lives < 2) {
        this.life2.setFrame(1)
      }
      if (this.lives < 1) {
        this.life1.setFrame(1)
      }

      this.scene.time.addEvent({
        delay: 2000,
        callback: () => {
          if (this.lives === 0) {
            this.scene.events.emit('gameOver')
          }
        },
      })
    })

    this.scoreText = scene.add
      .text(width / 2, 18, this.score, {
        fontFamily: 'Space Mono',
        fontSize: 60,
        color: '#ffffff',
      })
      .setShadow(2, 2, '#333333', 2, false, true)
    this.scoreText.setOrigin(0.5, 0)

    this.waveText = scene.add
      .text(width / 2, 90, this.scene.totalWaves, {
        fontFamily: 'Space Mono',
        fontSize: 30,
        color: '#ffffff',
      })
      .setShadow(2, 2, '#333333', 2, false, true)
    this.waveText.setOrigin(0.5, 0)
  }
}
