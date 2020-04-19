import { MOVE_TOWARD_TARGET, BLINK, SCORE_TEXT } from '../behaviors'

export class Bot extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bot')
    this.setDepth(10)
    this.shieldSprite = scene.add.image(x, y, 'shield')
    this.shieldSprite.setScale(1.7)
    this.shieldSprite.setOrigin(0.5, 0.6)
    this.shieldSprite.setDepth(12)
    this.shieldSprite.setActive(false)
    this.shieldSprite.setVisible(false)
    this.setActive(true)
    this.setVisible(true)
    scene.physics.world.enable(this)
    this.setCollideWorldBounds(true)
    this.setScale(1.5)
    this.health = 100
    this.shield = 0
    this.power = 0
    this.hitSound = scene.sound.add('botHit1', { volume: 2 })
    this.hitShieldSound = scene.sound.add('shieldHit1', { volume: 2 })
    this.deathSound = scene.sound.add('death', { volume: 3 })

    scene.behavior.enable(this)
    this.behaviors.set('moveTowardMouse', MOVE_TOWARD_TARGET, {
      speed: 1300,
      target: scene.target,
      turnRate: 1000,
    })
    this.behaviors.set('blink', BLINK)
    this.behaviors.set('scoreText', SCORE_TEXT)
  }

  heal(amount) {
    // TODO: should heal shield as well
    this.health += amount
    if (this.health > 100) {
      this.health = 100
    }
    this.scene.events.emit('health', { health: this.health })
  }

  giveShield(amount = 100) {
    this.shieldSprite.setActive(true)
    this.shieldSprite.setVisible(true)
    this.shield = amount
    this.scene.events.emit('shield', { shield: this.shield })
  }

  givePower(amount = 100) {
    this.power = amount
    this.scene.events.emit('power', { power: this.power })
  }

  usePower(amount = 20) {
    this.power -= amount
    this.scene.events.emit('power', { power: this.power })
  }

  damage(damage) {
    if (!this.invulnerable && this.active) {
      if (this.shield > 0) {
        this.shield -= damage
        this.hitShieldSound.play()
      } else {
        this.scene.events.emit('shake', { type: 'small' })
        this.health -= damage
        this.hitSound.play()
      }
      if (this.shield <= 0) {
        this.shield = 0
        this.shieldSprite.setActive(false)
        this.shieldSprite.setVisible(false)
      }
      if (this.health <= 0) {
        this.health = 0
        this.die()
      }
      this.scene.events.emit('shield', { shield: this.shield })
      this.scene.events.emit('health', { health: this.health })
    }
  }

  die() {
    this.emit('kill')
    this.scene.events.emit('loseLife')
    this.deathSound.play()
    this.setActive(false)
    this.setVisible(false)
    this.shieldSprite.setActive(false)
    this.shieldSprite.setVisible(false)
    this.power = 0
    this.scene.events.emit('power', { power: this.power })

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
    this.shield = 0
    this.setActive(true)
    this.setVisible(true)
    this.scene.events.emit('health', { health: 100 })
    this.setPosition(this.scene.target.x, this.scene.target.y)
  }
}
