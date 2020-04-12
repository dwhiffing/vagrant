import {
  EXPLODE,
  SMOKE,
  MOVE_TOWARD_TARGET,
  STALL,
  WOBBLE,
} from '../../behaviors'
import { TYPES } from './types'

export class Missile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'missile')

    const rand = Math.random()
    this.opts = TYPES.normal
    if (rand > 0.6) {
      this.opts = TYPES.fast
    }
    if (rand > 0.8) {
      this.opts = TYPES.big
    }
    this.turnCounter = 0
    this.score = this.opts.score
    this.health = this.opts.health
    this.setFrame(this.opts.frame)

    scene.behavior.enable(this)

    this.behaviors.set('smoke', SMOKE, this.opts.smoke)

    this.behaviors.set('explode', EXPLODE, {
      getTargets: () => [this.scene.bot],
      explosionDamage: this.opts.explosionDamage,
      explosionDelay: this.opts.explosionDelay,
      triggerRadius: this.opts.triggerRadius,
      explosionRadius: this.opts.explosionRadius,
    })

    this.behaviors.set('moveToward', MOVE_TOWARD_TARGET, {
      speed: this.opts.speed,
      target: scene.bot,
      turnRate: this.opts.turnRate,
      getShouldAvoid: () =>
        scene.missileGroup
          .getChildren()
          .find(
            (m) =>
              m !== this &&
              Phaser.Math.Distance.Between(this.x, this.y, m.x, m.y) <
                this.opts.avoidRadius,
          ),
    })

    this.behaviors.set('stall', STALL, {
      stallTimeout: this.opts.stallTimeout,
      stallDuration: this.opts.stallDuration,
      stallRecharge: this.opts.stallRecharge,
    })

    this.behaviors.set('wobble', WOBBLE, {
      wobbleLimit: this.opts.wobbleLimit,
      wobbleSpeed: this.opts.wobbleSpeed,
    })
  }

  fire(x, y) {
    this.emit('fire')
    this.body.reset(x, y)
    this.setActive(true)
    this.setVisible(true)
    this.setScale(this.opts.scale)
  }

  damage(amount) {
    this.health -= amount
    if (this.health <= 0) {
      this.scene.events.emit('score', { amount: this.score })
      this.destroy()
    }
  }

  destroy() {
    this.emit('destroy')
    this.setActive(false)
    this.setVisible(false)
  }
}
