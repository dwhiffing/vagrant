import {
  DROP_ITEM,
  EXPLODE,
  BLINK,
  DESTROY_OUT_OF_BOUNDS,
  SCORE_TEXT,
} from '../../behaviors'
import { TYPES } from './types'

const ROCK_TYPES = [TYPES.normal, TYPES.fast, TYPES.big]
export class Rock extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'rock')
    this.setActive(false)
    this.setVisible(false)
    scene.behavior.enable(this)
    scene.physics.world.enable(this)
  }

  init(type) {
    this.opts = ROCK_TYPES[type]
    this.health = this.opts.health
    this.type = type
    this.score = this.opts.score
    this.explosionDamage = this.opts.explosionDamage
    this.setFrame(this.opts.frame)
    this.setScale(this.opts.scale)
    this.body.setSize(this.opts.size, this.opts.size, false)
    this.body.setOffset(25, 25)

    this.behaviors.set('blink', BLINK)
    this.behaviors.set('destroyOutOfBounds', DESTROY_OUT_OF_BOUNDS)
    this.behaviors.set('dropItem', DROP_ITEM)
    this.behaviors.set('scoreText', SCORE_TEXT)

    this.behaviors.set('explode', EXPLODE, {
      getTargets: () => [this.scene.bot],
      explosionKey: 'explosion',
      explosionSound: 'explosion2',
      explosionDamage: this.opts.explosionDamage,
      explosionDelay: this.opts.explosionDelay,
      triggerRadius: this.opts.triggerRadius,
      explosionRadius: this.opts.explosionRadius,
    })
  }

  spawn(x, y) {
    this.health = this.opts.health
    this.setActive(true)
    this.setVisible(true)
    this.body.reset(x, y)
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
  }

  damage(amount, instakill = false, triggerPowerup = false) {
    this.health -= amount
    this.emit('blink', { blinkRepeat: 1, blinkRate: 50 })

    if (this.health <= 0) {
      this.scene.events.emit('score', { amount: this.score })
      this.emit('score')
      this.kill({ triggerPowerup })
    }
  }

  kill({ shouldDamage = false, triggerPowerup = false } = {}) {
    if (this.visible) {
      this.emit('kill', { shouldDamage, triggerPowerup })
    }
    this.disableBody()
    this.setActive(false)
    this.setVisible(false)
  }
}
