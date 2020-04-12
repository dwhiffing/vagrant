import { MOVE_TOWARD_TARGET } from '../behaviors/moveToward'

export class Bot extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bot')
    this.setOrigin(0.5, 0.5)
    this.setActive(true)
    this.setVisible(true)
    scene.physics.world.enable(this)
    this.setCollideWorldBounds(true)
    this.setScale(1.5)
    this.health = 100

    scene.behavior.enable(this)
    this.behaviors.set('moveTowardMouse', MOVE_TOWARD_TARGET, {
      speed: 1000,
      target: scene.target,
      turnRate: 1000,
    })
  }

  damage(damage = 20) {
    this.health -= damage
    if (this.health < 0) {
      this.health = 0
    }
    this.scene.healthBarIn.scaleX = 2.5 * (this.health / 100)
    if (this.health <= 0) {
      this.destroy()
    }
  }

  destroy() {
    this.emit('destroy')
    this.setActive(false)
    this.setVisible(false)
    this.scene.time.addEvent({
      delay: 2000,
      callback: () => {
        if (this.scene.lives === 1) {
          this.scene.scene.start('Menu', { score: this.scene.score })
        } else {
          this.scene.scene.start('Game', {
            lives: this.scene.lives - 1,
            score: this.scene.score,
          })
        }
      },
    })
    this.scene.life3.setFrame(1)
    if (this.scene.lives < 3) {
      this.scene.life2.setFrame(1)
    }
    if (this.scene.lives < 2) {
      this.scene.life1.setFrame(1)
    }
  }
}
