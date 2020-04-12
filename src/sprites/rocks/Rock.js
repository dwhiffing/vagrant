import { EXPLODE, BLINK, DESTROY_OUT_OF_BOUNDS } from '../../behaviors'
import { TYPES } from './types'

export class Rock extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'rock')

    const rand = Math.random()
    this.opts = TYPES.normal
    if (rand > 0.6) {
      this.opts = TYPES.fast
    }
    if (rand > 0.8) {
      this.opts = TYPES.big
    }
    this.score = this.opts.score
    this.health = this.opts.health
    this.setFrame(this.opts.frame)

    scene.behavior.enable(this)

    this.behaviors.set('explode', EXPLODE, {
      getTargets: () => [
        this.scene.bot,
        //TODO: rocks/missiles should collide instead and explode when out of health
        ...this.scene.missileGroup.getChildren(),
      ],
      explosionKey: 'explosion',
      explosionDamage: this.opts.explosionDamage,
      explosionDelay: this.opts.explosionDelay,
      triggerRadius: this.opts.triggerRadius,
      explosionRadius: this.opts.explosionRadius,
    })

    this.behaviors.set('blink', BLINK)
    this.behaviors.set('destroyOutOfBounds', DESTROY_OUT_OF_BOUNDS)
  }

  fire(x, y, target = this.scene.bot) {
    this.emit('fire')
    this.target = target
    this.body.reset(x, y)
    this.setActive(true)
    this.setVisible(true)
    this.setScale(this.opts.scale)
    const speed = this.opts.speed
    this.body.setVelocity(x < 0 ? speed : -speed, y < 0 ? speed : -speed)
    // this.body.setVelocity(
    //   Phaser.Math.RND.between(-speed, speed),
    //   Phaser.Math.RND.between(-speed, speed),
    // )
    this.body.angularVelocity = Phaser.Math.RND.pick([
      100,
      -100,
      50,
      -50,
      25,
      -25,
    ])
    this.explosionDamage = this.opts.explosionDamage
  }

  damage(amount) {
    this.health -= amount

    if (this.health <= 0) {
      this.emit('blink')
      this.scene.events.emit('score', { amount: this.score })
      this.kill()
    }
  }

  kill({ shouldDamage = false } = {}) {
    if (this.visible) {
      this.emit('kill', { shouldDamage })
    }
    this.setActive(false)
    this.setVisible(false)
  }
}
