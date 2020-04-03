import { Missiles } from './Missiles'
import { Explosions } from './Explosions'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
  }

  create() {
    this.behavior = this.plugins.get('BehaviorPlugin')
    this.missileGroup = new Missiles(this)
    this.explosionGroup = new Explosions(this)

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
