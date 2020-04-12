import { EXPLODE, SMOKE, MOVE_TOWARD_TARGET } from '../behaviors'

export class Missile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'missile')
    this.setOrigin(0.5, 0.5)
    this.turnCounter = 0

    scene.behavior.enable(this)
    this.behaviors.set('explode', EXPLODE, {
      getTargets: () => [this.scene.bot],
    })
    this.behaviors.set('smoke', SMOKE)
    this.behaviors.set('moveToward', MOVE_TOWARD_TARGET, {
      speed: 400,
      target: scene.bot,
      wobbleLimit: 20,
      wobbleSpeed: 450,
      stallTimeout: 120,
      getAvoidGroup: () => scene.missileGroup,
    })
  }

  fire(x, y) {
    this.emit('fire')
    this.body.reset(x, y)
    this.setActive(true)
    this.setVisible(true)
    this.setScale(2)
  }

  destroy({ shouldScore } = {}) {
    this.emit('destroy')
    this.setActive(false)
    this.setVisible(false)
    if (shouldScore) {
      this.scene.score += 10
      this.scene.scoreText.setText(`${this.scene.score}`)
    }
  }
}
