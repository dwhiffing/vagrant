import {
  EXPLODE,
  SMOKE,
  MOVE_TOWARD_TARGET,
  STALL,
  WOBBLE,
  BLINK,
  DROP_ITEM,
} from '../../behaviors'
import { TYPES } from './types'
import sample from 'lodash/sample'

const MIN_EXPLODE_TIME = 500
const MAX_EXPLODE_TIME = 1200

export class Missile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'missile')
    this.setActive(false)
    this.setVisible(false)
    this.opts = Phaser.Math.RND.pick([TYPES.normal, TYPES.fast, TYPES.big])
    this.turnCounter = 0

    scene.behavior.enable(this)

    this.behaviors.set('smoke', SMOKE, this.opts.smoke)

    this.behaviors.set('explode', EXPLODE, {
      getTargets: () => [this.scene.bot],
      explosionDamage: this.opts.explosionDamage,
      explosionDelay: this.opts.explosionDelay,
      triggerRadius: this.opts.triggerRadius,
      explosionKey: 'explosion-2',
      explosionSound: 'explosion1',
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

    this.behaviors.set('blink', BLINK)
    this.behaviors.set('dropItem', DROP_ITEM)
  }

  fire(x, y, target = this.scene.bot) {
    this.emit('fire')
    this.target = target
    this.body.reset(x, y)
    this.setActive(true)
    this.setVisible(true)
    this.setScale(this.opts.scale)
    this.health = this.opts.health
    this.score = this.opts.score
    this.explosionDamage = this.opts.explosionDamage
    this.enableBody()
    this.clearTint()
    this.setFrame(this.opts.frame)
    this.body.setSize(this.opts.size, this.opts.size, false)
    this.body.setOffset(35, 35)
  }

  damage(amount, instakill = false) {
    this.health -= amount

    this.emit('blink', { blinkRepeat: 1, blinkRate: 50 })
    if (this.health <= 0) {
      const target = sample([
        [0, 0],
        [this.scene.cameras.main.width, 0],
        [0, this.scene.cameras.main.height],
        [this.scene.cameras.main.width, this.scene.cameras.main.height],
      ])
      this.target = { x: target[0], y: target[1], active: true }

      this.emit('blink', {
        blinkRate: 150,
        blinkRepeat: 13,
      })
      this.explosionDamage = 0
      this.scene.events.emit('score', { amount: this.score })

      this.scene.time.addEvent({
        delay: instakill
          ? 0
          : Phaser.Math.RND.between(MIN_EXPLODE_TIME, MAX_EXPLODE_TIME),
        callback: () => {
          this.kill()
        },
      })
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
