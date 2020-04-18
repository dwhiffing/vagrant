import { EXPLODE } from '../behaviors'

const MAX_MINES = 5
export class Mines extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene)
    this.canLay = true
    this.createMultiple({
      frameQuantity: MAX_MINES,
      key: 'mine',
      active: false,
      visible: false,
      classType: Mine,
      setXY: {
        x: -100,
        y: -100,
      },
    })
  }

  spawn(x, y) {
    if (this.countActive(true) < MAX_MINES) {
      let mine = this.getFirstDead(false)
      if (mine && this.canLay) {
        this.canLay = false
        mine.body.reset(x, y)
        mine.setActive(true)
        mine.setScale(4)
        mine.setVisible(true)
        this.scene.time.addEvent({
          delay: 500,
          callback: () => (this.canLay = true),
        })
      }
    }
  }
}

class Mine extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'mine')

    scene.behavior.enable(this)
    this.behaviors.set('explode', EXPLODE, {
      destroyTargets: true,
      explosionDelay: 350,
      triggerRadius: 180,
      explosionRadius: 200,
      explosionDamage: 20,
      explosionKey: 'explosion-3',
      getShouldExplode: () =>
        Phaser.Math.Distance.Between(
          this.x,
          this.y,
          this.scene.bot.x,
          this.scene.bot.y,
        ) > 150,
      getTargets: () => [
        ...this.scene.missileGroup.getChildren().filter((c) => c.active),
        ...this.scene.rockGroup.getChildren().filter((c) => c.active),
      ],
    })
  }

  kill() {
    if (this.visible) {
      this.emit('kill', { shouldDamage: true })
    }
    this.setActive(false)
    this.setVisible(false)
  }
}
