import { BLINK } from '../behaviors'

export class Items extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene)
    this.createMultiple({
      frameQuantity: 20,
      key: 'item',
      active: false,
      visible: false,
      classType: Item,
      setXY: {
        x: -100,
        y: -100,
      },
    })
  }

  spawn(x, y, key) {
    if (this.countActive(true) < 10) {
      let item = this.getFirstDead(false)
      if (item) {
        item.body.reset(x, y)
        item.setScale(2)
        item.setActive(true)
        item.setVisible(true)
        item.setFrame(key)
        item.scene.time.addEvent({
          delay: 3000,
          callback: () => {
            item.emit('blink', {
              blinkRate: 200,
              blinkRepeat: 11,
              useAlpha: true,
              onBlinkComplete: () => item.kill(),
            })
          },
        })
      }
    }
  }
}

class Item extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'item')

    scene.behavior.enable(this)
    this.behaviors.set('blink', BLINK)
  }

  kill() {
    this.setActive(false)
    this.setVisible(false)
  }
}