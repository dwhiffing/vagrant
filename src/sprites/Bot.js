import { MOVE_TOWARD_MOUSE } from '../behaviors/moveToward'

export class Bot extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bot')
    this.setOrigin(0.5, 0.5)
    this.setScale(0.5)
    this.setActive(true)
    this.setVisible(true)
    scene.physics.world.enable(this)

    // scene.events.on('update', (time, delta) => {
    //   this.update(time, delta)
    // })

    scene.behavior.enable(this)
    this.behaviors.set('moveTowardMouse', MOVE_TOWARD_MOUSE, { speed: 1000 })
  }

  destroy() {
    this.emit('destroy')
    this.setActive(false)
    this.setVisible(false)
  }
}
