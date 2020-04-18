export const SPAWN = {
  options: {
    delay: 2000,
    vertical: false,
  },

  $create: function (entity, opts) {
    entity.createMultiple({
      frameQuantity: 20,
      key: opts.key,
      active: false,
      visible: false,
      classType: opts.classType,
      setXY: { x: -100, y: -100 },
    })

    entity.spawn = () => {
      const containerWidth = entity.scene.cameras.main.width
      const containerHeight = entity.scene.cameras.main.height
      let x, y
      if (opts.vertical) {
        x = Phaser.Math.RND.between(80, containerWidth - 80)
        y = Math.random() < 0.5 ? containerHeight + 80 : -80
      } else {
        x = Math.random() < 0.5 ? containerWidth + 80 : -80
        y = Phaser.Math.RND.between(80, containerHeight - 80)
      }

      let child = entity.getFirstDead()
      if (child) {
        child.spawn(x, y, opts.key)
      }
    }

    entity.scene.time.addEvent({
      delay: opts.delay,
      callback: entity.spawn,
      callbackScope: entity,
      loop: true,
    })
  },

  update: function (entity) {},
}
