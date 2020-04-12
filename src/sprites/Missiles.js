import { EXPLODE, SMOKE, MOVE_TOWARD_TARGET, STALL, WOBBLE } from '../behaviors'

export class Missiles extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene)
    this.createMultiple({
      frameQuantity: 20,
      key: 'missile',
      active: false,
      visible: false,
      classType: Missile,
      setXY: { x: -100, y: -100 },
    })
  }

  spawn() {
    if (this.countActive(true) < 5) {
      const containerWidth = this.scene.cameras.main.width
      const containerHeight = this.scene.cameras.main.height
      let x = Phaser.Math.RND.between(50, containerWidth - 50)
      let y = Math.random() < 0.5 ? containerHeight + 50 : -50

      if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? containerWidth + 50 : -50
        y = Phaser.Math.RND.between(50, containerHeight - 50)
      }
      let bullet = this.getFirstDead(false)
      if (bullet) {
        bullet.fire(x, y)
      }
    }
  }
}

class Missile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'missile')
    this.turnCounter = 0
    this.score = 10
    this.health = 10

    scene.behavior.enable(this)
    this.behaviors.set('explode', EXPLODE, {
      getTargets: () => [this.scene.bot],
    })
    this.behaviors.set('smoke', SMOKE)
    this.behaviors.set('moveToward', MOVE_TOWARD_TARGET, {
      speed: 400,
      target: scene.bot,
      turnRate: 4,
      getShouldAvoid: () =>
        scene.missileGroup
          .getChildren()
          .find(
            (m) =>
              m !== this &&
              Phaser.Math.Distance.Between(this.x, this.y, m.x, m.y) < 50,
          ),
    })
    this.behaviors.set('stall', STALL)
    this.behaviors.set('wobble', WOBBLE)
  }

  fire(x, y) {
    this.emit('fire')
    this.body.reset(x, y)
    this.setActive(true)
    this.setVisible(true)
    this.setScale(2)
  }

  damage(amount = 10) {
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
