import { MOVE_TOWARD_TARGET, BLINK } from '../behaviors'

export class Bot extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bot')
    this.setActive(true)
    this.setVisible(true)
    scene.physics.world.enable(this)
    this.setCollideWorldBounds(true)
    this.setScale(1.5)
    this.health = 100
    this.hitSound = scene.sound.add('botHit1', { volume: 2 })
    this.hitSound2 = scene.sound.add('botHit2', { volume: 2 })
    this.hitSound3 = scene.sound.add('botHit3', { volume: 2 })
    this.deathSound = scene.sound.add('death', { volume: 3 })

    scene.behavior.enable(this)
    this.behaviors.set('moveTowardMouse', MOVE_TOWARD_TARGET, {
      speed: 1300,
      target: scene.target,
      turnRate: 1000,
    })
    this.behaviors.set('blink', BLINK)
  }

  heal(amount) {
    this.health += amount
    if (this.health > 100) {
      this.health = 100
    }
    this.scene.events.emit('health', { health: this.health })
  }

  damage(damage) {
    if (!this.invulnerable && this.active) {
      this.health -= damage
      this.hitSound.play()
      if (this.health <= 0) {
        this.health = 0
        this.die()
      }
      this.scene.events.emit('health', { health: this.health })
    }
  }

  die() {
    this.emit('kill')
    this.scene.events.emit('loseLife')
    this.deathSound.play()
    this.setActive(false)
    this.setVisible(false)
    if (this.scene.interface.lives > 0) {
      this.scene.time.addEvent({
        delay: 3000,
        callback: () => {
          this.restore()
        },
      })
    }
  }

  restore() {
    this.invulnerable = true
    this.emit('blink', {
      blinkRate: 200,
      blinkRepeat: 21,
      useAlpha: true,
      onBlinkComplete: () => (this.invulnerable = false),
    })
    this.health = 100
    this.setActive(true)
    this.setVisible(true)
    this.scene.events.emit('health', { health: 100 })
    this.setPosition(this.scene.target.x, this.scene.target.y)
  }
}
