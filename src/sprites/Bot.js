import { MOVE_TOWARD_TARGET } from '../behaviors/moveToward'

export class Bot extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bot')
    this.setActive(true)
    this.setVisible(true)
    scene.physics.world.enable(this)
    this.setCollideWorldBounds(true)
    this.setScale(1.5)
    this.health = 100

    scene.behavior.enable(this)
    this.behaviors.set('moveTowardMouse', MOVE_TOWARD_TARGET, {
      speed: 1300,
      target: scene.target,
      turnRate: 1000,
    })
  }

  damage(damage) {
    this.health -= damage
    if (this.health < 0) {
      this.health = 0
    }
    if (this.health <= 0 && this.active) {
      this.die()
    }
    this.scene.events.emit('health', { health: this.health })
  }

  die() {
    this.emit('destroy')
    this.scene.events.emit('loseLife')
    this.setActive(false)
    this.setVisible(false)
  }
}
