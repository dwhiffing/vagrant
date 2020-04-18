import { BLINK } from '../behaviors'

export class Items extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene)
    this.appearSound = scene.sound.add('itemAppears', { volume: 2 })
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
      let item = this.getFirstDead()
      if (item) {
        this.appearSound.play()
        item.spawn(x, y)
      }
    }
  }
}

class Item extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'item')
    this.pickupSound = scene.sound.add('itemPickup', { volume: 3 })

    scene.behavior.enable(this)
    this.behaviors.set('blink', BLINK)
  }

  spawn(x, y, key) {
    this.body.reset(x, y)
    this.setScale(2)
    this.setActive(true)
    this.setVisible(true)
    this.setFrame(key)
    this.event = this.scene.time.addEvent({
      delay: 3000,
      callback: () => {
        this.emit('blink', {
          blinkRate: 200,
          blinkRepeat: 11,
          useAlpha: true,
          onBlinkComplete: () => this.kill(),
        })
      },
    })
  }

  kill() {
    this.pickupSound.play()
    this.setActive(false)
    this.setVisible(false)
    if (this.event) {
      this.event.destroy()
    }
  }
}
