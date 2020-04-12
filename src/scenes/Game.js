import { Missiles } from '../sprites/Missiles'
import { Mines } from '../sprites/Mines'
import { Bot } from '../sprites/Bot'

let iter = 0

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
  }

  create() {
    const { width, height } = this.game.canvas
    this.behavior = this.plugins.get('BehaviorPlugin')
    this.background = this.add.tileSprite(
      width / 2,
      height / 2,
      width,
      height,
      'background',
    )
    this.background.tileScaleX = 3.5
    this.background.tileScaleY = 3.5

    this.touchX = width / 2
    this.touchY = height / 2
    this.lastX = this.touchX
    this.lastY = this.touchY
    this.target = this.add.sprite(width / 2, height / 2, 'target')
    this.physics.world.enable(this.target)
    this.target.body.setCollideWorldBounds(true)
    this.input.addPointer(2)
    this.input.pointer1.id

    this.mines = new Mines(this)

    this.bot = this.add.existing(new Bot(this, width / 2, height / 2))

    this.missileGroup = new Missiles(this)

    this.input.keyboard.on('keydown-SPACE', (event) => {
      this.mines.spawn(this.bot.x, this.bot.y)
    })

    this.input.on('pointerdown', ({ x, y, id }) => {
      if (id === 1) {
        this.lastX = this.target.x
        this.lastY = this.target.y
        this.touchX = x
        this.touchY = y
      }
      if (
        !this.input.pointer1.wasTouch ||
        (id === 2 && this.input.pointer1.isDown)
      ) {
        this.mines.spawn(this.bot.x, this.bot.y)
      }
    })

    this.input.on('pointermove', ({ x, y, id }) => {
      if (this.input.activePointer.wasTouch) {
        if (id === 1) {
          const diff = { x: x - this.touchX, y: y - this.touchY }
          this.target.x = this.lastX + diff.x * 2
          this.target.y = this.lastY + diff.y * 2
        }
      } else {
        this.target.x = x
        this.target.y = y
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
    this.background.tilePositionX = Math.cos(iter) * 100
    this.background.tilePositionY -= 0.8
    iter += 0.001
  }
}
