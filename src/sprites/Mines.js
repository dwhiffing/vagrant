import { EXPLODE } from '../behaviors'

export class Mines extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene)
    this.createMultiple({
      frameQuantity: 20,
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
    if (this.countActive(true) < 10) {
      let mine = this.getFirstDead(false)
      if (mine) {
        mine.body.reset(x, y)
        mine.setActive(true)
        mine.setScale(4)
        mine.setVisible(true)
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
      triggerRadius: 120,
      explosionRadius: 200,
      explosionDamage: 20,
      getTargets: () => this.scene.missileGroup.getChildren(),
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
