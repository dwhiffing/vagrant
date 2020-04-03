import { EXPLODE, SMOKE, WOBBLE, STALL } from '../behaviors'

const SPEED = 550
const TURN_RATE = 5
const AVOID_DISTANCE = 30

export class Missile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'rocket')
    this.setOrigin(0.5, 0.5)

    scene.behavior.enable(this)
    this.behaviors.set('explode', EXPLODE)
    this.behaviors.set('smoke', SMOKE)
    this.behaviors.set('wobble', WOBBLE)
    this.behaviors.set('stall', STALL)
  }

  fire(x, y) {
    this.emit('fire')
    this.body.reset(x, y)
    this.setActive(true)
    this.setVisible(true)
  }

  destroy() {
    this.emit('destroy')
    this.setActive(false)
    this.setVisible(false)
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta)
    if (!this.active) {
      return
    }

    let avoidAngle = 0
    this.scene.missileGroup.getChildren().forEach(function(m) {
      if (this == m) return
      if (avoidAngle !== 0) return
      var distance = Phaser.Math.Distance.Between(this.x, this.y, m.x, m.y)
      if (distance < AVOID_DISTANCE) {
        avoidAngle = Math.PI / 2
        if (Math.random() > 0.5) avoidAngle *= -1
      }
    }, this)

    const target =
      Phaser.Math.Angle.Between(
        this.x,
        this.y,
        this.scene.missileGroup.activeX,
        this.scene.missileGroup.activeY,
      ) +
      // move to wobble behavior
      Phaser.Math.DegToRad(this.wobble) +
      avoidAngle

    if (this.rotation !== target && !this.stalled) {
      this.rDelta = target - this.rotation
      if (this.rDelta > Math.PI) this.rDelta -= Math.PI * 2
      if (this.rDelta < -Math.PI) this.rDelta += Math.PI * 2
      if (this.rDelta > 0) {
        this.angle += TURN_RATE
      } else {
        this.angle -= TURN_RATE
      }
      if (Math.abs(this.rDelta) < Phaser.Math.DegToRad(TURN_RATE)) {
        this.rotation = target
      }
    }
    const speedDelta = Math.max(1 - Math.abs(this.rDelta), 0.5)

    this.body.velocity.x =
      Math.cos(this.rotation) * SPEED * speedDelta * this.stallSpeed
    this.body.velocity.y =
      Math.sin(this.rotation) * SPEED * speedDelta * this.stallSpeed
  }
}
