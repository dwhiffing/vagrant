import { EXPLODE, SMOKE, MOVE_TOWARD_MOUSE } from '../behaviors'

export class Missile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'rocket')
    this.setOrigin(0.5, 0.5)
    this.turnCounter = 0

    scene.behavior.enable(this)
    this.behaviors.set('explode', EXPLODE, {
      getTargets: () => [this.scene.input.activePointer],
    })
    this.behaviors.set('smoke', SMOKE)
    this.behaviors.set('moveTowardMouse', MOVE_TOWARD_MOUSE)
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
}
