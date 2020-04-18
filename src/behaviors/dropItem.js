export const DROP_ITEM = {
  options: {},

  $create: function (entity, opts) {
    entity.on('kill', (opts) => {
      const itemKey = Phaser.Math.RND.weightedPick([0, 0, 0, 0, 0, 1, 2, 3, 4])
      if (itemKey) {
        entity.scene.items.spawn(entity.x, entity.y, itemKey - 1)
      }
    })
  },
}
