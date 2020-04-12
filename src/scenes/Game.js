import { Missiles } from '../sprites/Missiles'
import { Background } from '../sprites/Background'
import { Mines } from '../sprites/Mines'
import { Bot } from '../sprites/Bot'
import { Interface } from '../sprites/Interface'
import { Target } from '../sprites/Target'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
  }

  init(opts) {
    this.lives = opts.lives || 3
    this.score = opts.score || 0
    this.iter = 0
  }

  create() {
    const { width, height } = this.game.canvas
    this.behavior = this.plugins.get('BehaviorPlugin')

    this.background = this.add.existing(new Background(this, width, height))
    this.target = this.add.existing(new Target(this, width / 2, height / 2))
    this.mines = new Mines(this)
    this.bot = this.add.existing(new Bot(this, width / 2, height / 2))
    this.missileGroup = new Missiles(this)
    this.interface = new Interface(this, this.lives, this.score)

    this.touch = { x: width / 2, y: height / 2 }
    this.last = { x: this.touch.x, y: this.touch.y }
    this.input.addPointer(2)

    this.input.keyboard.on('keydown-SPACE', () => {
      this.mines.spawn(this.bot.x, this.bot.y)
    })

    this.input.on('pointerdown', ({ x, y, id, wasTouch }) => {
      if (id === 1) {
        this.last = { x: this.target.x, y: this.target.y }
        this.touch = { x, y }
      }
      if (!wasTouch || (id === 2 && this.input.pointer1.isDown)) {
        this.mines.spawn(this.bot.x, this.bot.y)
      }
    })

    this.input.on('pointermove', ({ x, y, id }) => {
      if (!this.input.activePointer.wasTouch) {
        return this.target.setPosition(x, y)
      }

      if (id === 1) {
        const dX = this.last.x + (x - this.touch.x) * 2
        const dY = this.last.y + (y - this.touch.y) * 2
        this.target.setPosition(dX, dY)
      }
    })

    this.time.addEvent({
      delay: 1000,
      callback: this.missileGroup.spawn,
      callbackScope: this.missileGroup,
      loop: true,
    })
  }

  update() {
    this.behavior.preUpdate()
    this.behavior.update()
    this.background.update()
  }
}