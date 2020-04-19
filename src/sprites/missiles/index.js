import { Missile } from './Missile'
import { SPAWN } from '../../behaviors'

export class Missiles extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene)
    scene.behavior.enable(this)
    this.behaviors.set('spawn', SPAWN, { key: 'missile', classType: Missile })
  }
}
