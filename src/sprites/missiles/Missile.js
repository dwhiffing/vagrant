import {
  EXPLODE,
  SMOKE,
  MOVE_TOWARD_TARGET,
  STALL,
  WOBBLE,
  BLINK,
  DROP_ITEM,
  SCORE_TEXT,
} from '../../behaviors'
import { TYPES } from './types'
import sample from 'lodash/sample'

const MIN_EXPLODE_TIME = 300
const MAX_EXPLODE_TIME = 800
const MISSILE_TYPES = [TYPES.normal, TYPES.fast, TYPES.big]

export class Missile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'missile')
    this.setActive(false)
    this.setVisible(false)
    scene.physics.world.enable(this)
    scene.behavior.enable(this)
  }

  init(type) {
    this.type = type
    this.opts = MISSILE_TYPES[type]
    this.setScale(this.opts.scale)
    this.health = this.opts.health
    this.score = this.opts.score
    this.explosionDamage = this.opts.explosionDamage
    this.setFrame(this.opts.frame)
    this.body.setSize(this.opts.size, this.opts.size, false)
    this.body.setOffset(35, 35)

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
      target: this.scene.bot,
      turnRate: this.opts.turnRate,
      getShouldAvoid: () =>
        this.scene.missileGroup
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
    this.behaviors.set('scoreText', SCORE_TEXT)
  }

  spawn(x, y) {
    this.emit('spawn')
    this.health = this.opts.health
    this.turnCounter = 0
    this.target = this.scene.bot
    this.body.reset(x, y)
    this.setActive(true)
    this.setVisible(true)
    this.enableBody()
    this.clearTint()
    this.explosionDamage = this.opts.explosionDamage
  }

  damage(amount, instakill = false, triggerPowerup = false) {
    this.health -= amount

    this.emit('blink', { blinkRepeat: 1, blinkRate: 50 })
    if (this.health <= 0) {
      // TODO: combine these
      this.emit('scoreText')
      this.scene.events.emit('score', { amount: this.score })

      if (instakill || Math.random() > 0.33) {
        this.kill({ triggerPowerup })
        return
      }

      this.explosionDamage = 0
      this.emit('blink', { blinkRate: 150, blinkRepeat: 13 })
      const target = sample([
        [0, 0],
        [this.scene.cameras.main.width, 0],
        [0, this.scene.cameras.main.height],
        [this.scene.cameras.main.width, this.scene.cameras.main.height],
      ])
      this.target = { x: target[0], y: target[1], active: true }

      this.scene.time.addEvent({
        delay: Phaser.Math.RND.between(MIN_EXPLODE_TIME, MAX_EXPLODE_TIME),
        callback: () => this.kill({ triggerPowerup }),
      })
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
