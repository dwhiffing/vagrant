const SPEED = 550
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
    this.stall = this.stall.bind(this)
    this.wobble = WOBBLE_LIMIT
    this.activeX = 300
    this.activeY = 300
    this.stallSpeed = 1
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
      scale: { start: 0.4, end: 0.3 },
      lifespan: { min: 400, max: 600 },
      alpha: { start: 0.6, end: 0 },
    })
    this.smokeEmitter.setBlendMode(Phaser.BlendModes.ADD)
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
      // Phaser.Math.DegToRad(this.wobble) +
      this.getAvoidAngle()

    let rDelta = 0
    if (this.rotation !== target && !this.stalled) {
      rDelta = target - this.rotation
      if (rDelta > Math.PI) rDelta -= Math.PI * 2
      if (rDelta < -Math.PI) rDelta += Math.PI * 2
      if (rDelta > 0) {
        this.angle += TURN_RATE
        if (this.turnCounterDirection === 1) {
          this.turnCounter = 0
        }
        this.turnCounterDirection = 0
        this.turnCounter++
      } else {
        if (this.turnCounterDirection === 0) {
          this.turnCounter = 0
        }
        this.turnCounterDirection = 1
        this.turnCounter++
        this.angle -= TURN_RATE
      }
      if (Math.abs(rDelta) < Phaser.Math.DegToRad(TURN_RATE)) {
        this.rotation = target
      }
    }
    const speedDelta = Math.max(1 - Math.abs(rDelta), 0.5)
    console.log(this.turnCounter)
    if (this.turnCounter > 120) {
      this.stall()
    }

    this.body.velocity.x =
      Math.cos(this.rotation) * SPEED * speedDelta * this.stallSpeed
    this.body.velocity.y =
      Math.sin(this.rotation) * SPEED * speedDelta * this.stallSpeed
  }

  stall() {
    this.turnCounter = 0
    this.smokeEmitter.stop()

    if (this.stalled || this.preventStall) {
      return
    }

    this.preventStall = true

    this.scene.tweens.addCounter({
      from: this.stallSpeed,
      to: 0,
      duration: 500,
      onComplete: () => {
        this.stalled = true
      },
      onUpdate: tween => {
        this.stallSpeed = tween.getValue()
      },
    })

    this.scene.time.addEvent({
      delay: 2000,
      callback: () => {
        this.stalled = false
        this.smokeEmitter.start()
        this.scene.tweens.addCounter({
          from: this.stallSpeed,
          to: 1,
          duration: 500,
          onUpdate: tween => {
            this.stallSpeed = tween.getValue()
          },
        })
      },
    })

    this.scene.time.addEvent({
      delay: 3000,
      callback: () => {
        this.preventStall = false
      },
    })
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
