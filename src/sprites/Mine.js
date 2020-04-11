import { EXPLODE } from '../behaviors'

export class Mine extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'rocket')
    this.setOrigin(0.5, 0.5)

    scene.behavior.enable(this)
    this.behaviors.set('explode', EXPLODE, {
      destroyTargets: true,
      explosionDelay: 100,
      explosionRadius: 150,
      getTargets: () => this.scene.missileGroup.getChildren(),
    })
  }

  destroy() {
    this.emit('destroy')
    this.setActive(false)
    this.setVisible(false)
  }
}
