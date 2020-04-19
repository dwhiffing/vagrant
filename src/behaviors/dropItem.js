const MIN_BONUS = 6
const MAX_BONUS = 20
export const DROP_ITEM = {
  options: {},

  $create: function (entity, opts) {
    entity.scene.bonusKillCountGoal =
      entity.scene.bonusKillCountGoal ||
      Phaser.Math.RND.between(MIN_BONUS, MAX_BONUS)
    entity.scene.bonusKillCount = entity.scene.bonusKillCount || 0
    entity.on('kill', (opts = {}) => {
      if (!opts.triggerPowerup) {
        return
      }
      if (entity.scene.bonusKillCount++ > entity.scene.bonusKillCountGoal) {
        entity.scene.bonusKillCountGoal = Phaser.Math.RND.between(
          MIN_BONUS,
          MAX_BONUS,
        )
        entity.scene.bonusKillCount = 0
        const itemKey = Phaser.Math.RND.shuffle([0, 0, 0, 1, 2, 3])
        entity.scene.items.spawn(entity.x, entity.y, itemKey[0])
      }
    })
  },
}
