import { Missiles } from '../sprites/Missiles'
import { Mines } from '../sprites/Mines'
import { Bot } from '../sprites/Bot'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
  }

  create() {
    const { width, height } = this.game.canvas
    this.behavior = this.plugins.get('BehaviorPlugin')
    const bot = new Bot(this, width / 2, height / 2)
    this.bot = this.add.existing(bot)
    this.mines = new Mines(this)
    this.missileGroup = new Missiles(this)

    this.input.on('pointerdown', ({ x, y }) => {
      this.mines.spawn(x, y)
    })

    this.time.addEvent({
      delay: 500,
      callback: this.missileGroup.spawn,
      callbackScope: this.missileGroup,
      loop: true,
    })
  }

  update() {
    this.behavior.preUpdate()
    this.behavior.update()
  }
}
