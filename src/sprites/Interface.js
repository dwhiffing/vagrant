export class Interface {
  constructor(scene, lives, score) {
    const { width } = scene.game.canvas
    this.lives = lives || 3
    this.scene = scene
    this.score = score || 0

    this.background = scene.add.image(20, 20, 'healthBar')
    this.background.setOrigin(0)
    this.background.setScale(2.5)

    this.bar = scene.add.image(43, 39, 'healthBarIn')
    this.bar.setOrigin(0)
    this.bar.setScale(2.5)

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

    this.scene.events.on('score', (opts) => {
      this.score += opts.amount
      if (this.scoreText.frame.data) {
        this.scoreText.text = `${this.score}`
      }
    })

    this.scene.events.on('health', (opts) => {
      this.bar.scaleX = 2.5 * (opts.health / 100)
    })

    this.scene.events.once('loseLife', () => {
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
            this.scene.scene.start('Menu', { score: this.score })
          } else {
            this.scene.scene.restart({
              lives: this.lives,
              score: this.score,
            })
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
  }
}
