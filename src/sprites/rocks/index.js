import { Rock } from './Rock'
import { SPAWN } from '../../behaviors'

export class Rocks extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene)
    scene.behavior.enable(this)
    this.behaviors.set('spawn', SPAWN, {
      key: 'rock',
      classType: Rock,
      delay: 1000,
      vertical: false,
    })
  }
}
