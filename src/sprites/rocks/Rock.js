import {
  DROP_ITEM,
  EXPLODE,
  BLINK,
  DESTROY_OUT_OF_BOUNDS,
} from '../../behaviors'
import { TYPES } from './types'

export class Rock extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'rock')

    this.opts = Phaser.Math.RND.pick([TYPES.normal, TYPES.fast, TYPES.big])
    this.setActive(false)
    this.setVisible(false)
    this.score = this.opts.score
    this.health = this.opts.health
    this.setFrame(this.opts.frame)

    scene.behavior.enable(this)

    this.behaviors.set('explode', EXPLODE, {
      getTargets: () => [this.scene.bot],
      explosionKey: 'explosion',
      explosionDamage: this.opts.explosionDamage,
      explosionDelay: this.opts.explosionDelay,
      triggerRadius: this.opts.triggerRadius,
      explosionRadius: this.opts.explosionRadius,
    })

    this.behaviors.set('blink', BLINK)
    this.behaviors.set('destroyOutOfBounds', DESTROY_OUT_OF_BOUNDS)
    this.behaviors.set('dropItem', DROP_ITEM)
  }

  fire(x, y, target = this.scene.bot) {
    this.emit('fire')
    this.target = target
    this.body.reset(x, y)
    this.setActive(true)
    this.setVisible(true)
    this.setScale(this.opts.scale)
    this.enableBody()
    const speed = this.opts.speed
    this.body.setVelocity(x < 0 ? speed : -speed, 0)
    this.body.angularVelocity = Phaser.Math.RND.pick([
      100,
      -100,
      50,
      -50,
      25,
      -25,
    ])
    this.explosionDamage = this.opts.explosionDamage
    this.body.setSize(this.opts.size, this.opts.size, false)
    this.body.setOffset(25, 25)
  }

  damage(amount) {
    this.health -= amount
    this.emit('blink', { blinkRepeat: 1, blinkRate: 50 })

    if (this.health <= 0) {
      this.scene.events.emit('score', { amount: this.score })
      this.kill()
    }
  }

  kill({ shouldDamage = false } = {}) {
    if (this.visible) {
      this.emit('kill', { shouldDamage })
    }
    this.disableBody()
    this.setActive(false)
    this.setVisible(false)
  }
}
