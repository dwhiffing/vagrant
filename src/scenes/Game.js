import { Explosions } from './Explosions'
import { Missiles } from './Missiles'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
  }

  create() {
    this.missileGroup = new Missiles(this)
    this.explosionGroup = new Explosions(this)
    this.activeX = 300
    this.activeY = 300

    this.input.on('pointermove', pointer => {
      this.activeX = pointer.x
      this.activeY = pointer.y
    })

    this.time.addEvent({
      delay: 500,
      callback: this.spawn,
      callbackScope: this,
      loop: true,
    })
  }

  update() {
    this.missileGroup
      .getChildren()
      .filter(s => s.active)
      .forEach(function(m) {
        var distance = Phaser.Math.Distance.Between(
          m.x,
          m.y,
          this.activeX,
          this.activeY,
        )
        m.activeX = this.activeX
        m.activeY = this.activeY
        if (distance < 50) {
          m.destroy()
          this.explosionGroup.makeExplosion(m.x, m.y)
        }
      }, this)
  }

  spawn() {
    if (this.missileGroup.countActive(true) < 5) {
      const containerWidth = this.cameras.main.width
      const containerHeight = this.cameras.main.height
      let x = Phaser.Math.RND.between(50, containerWidth - 50)
      let y = Math.random() < 0.5 ? containerHeight + 50 : -50

      if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? containerWidth + 50 : -50
        y = Phaser.Math.RND.between(50, containerHeight - 50)
      }
      this.missileGroup.fireMissile(x, y)
    }
  }
}
