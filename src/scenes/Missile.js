const SPEED = 250
const TURN_RATE = 5
const WOBBLE_LIMIT = 15
const WOBBLE_SPEED = 1000
const AVOID_DISTANCE = 30

export class Missile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'rocket')
    this.setOrigin(0.5, 0.5)

    this.preUpdate = this.preUpdate.bind(this)
    this.getAvoidAngle = this.getAvoidAngle.bind(this)
    this.wobble = WOBBLE_LIMIT
    this.scene.tweens.addCounter({
      from: -WOBBLE_LIMIT,
      to: WOBBLE_LIMIT,
      duration: WOBBLE_SPEED,
      loop: -1,
      onUpdate: tween => {
        this.wobble = tween.getValue()
      },
    })
    var particles = this.scene.add.particles('smoke')
    this.smokeEmitter = particles.createEmitter({
      speed: 0,
      frequency: 50,
      scale: { start: 1, end: 0.3 },
      lifespan: { min: 800, max: 900 },
      alpha: { start: 1, end: 0 },
    })
    this.smokeEmitter.startFollow(this)
  }

  fire(x, y) {
    this.body.reset(x, y)
    this.setActive(true)
    this.setVisible(true)
    this.smokeEmitter.start()
  }

  destroy() {
    this.setActive(false)
    this.setVisible(false)
    this.smokeEmitter.stop()
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta)
    if (!this.active) {
      return
    }
    const target =
      Phaser.Math.Angle.Between(this.x, this.y, this.activeX, this.activeY) +
      Phaser.Math.DegToRad(this.wobble) +
      this.getAvoidAngle()

    if (this.rotation !== target) {
      var delta = target - this.rotation
      if (delta > Math.PI) delta -= Math.PI * 2
      if (delta < -Math.PI) delta += Math.PI * 2
      if (delta > 0) {
        this.angle += TURN_RATE
      } else {
        this.angle -= TURN_RATE
      }
      if (Math.abs(delta) < Phaser.Math.DegToRad(TURN_RATE)) {
        this.rotation = target
      }
    }

    this.body.velocity.x = Math.cos(this.rotation) * SPEED
    this.body.velocity.y = Math.sin(this.rotation) * SPEED
  }

  getAvoidAngle() {
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
    return avoidAngle
  }
}
