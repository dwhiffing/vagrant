import { Missiles } from '../sprites/Missiles'
import { Mines } from '../sprites/Mines'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
  }

  create() {
    this.behavior = this.plugins.get('BehaviorPlugin')
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
