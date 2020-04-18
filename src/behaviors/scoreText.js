export const SCORE_TEXT = {
  options: {},

  $create: function (entity, opts) {
    entity.on('score', (opts) => {
      if (entity.scoreText) {
        entity.scoreText.destroy()
      }
      entity.scoreText = entity.scene.add.text(
        entity.x,
        entity.y,
        entity.score,
        { fontSize: 60 },
      )
      entity.scoreText.setShadow(2, 2, '#333333', 2, true, true)
    })
  },

  update: function (entity) {
    if (entity.scoreText) {
      entity.scoreText.y -= 1
      entity.scoreText.alpha -= 0.01
      if (entity.scoreText.alpha <= 0) {
        entity.scoreText.destroy()
      }
    }
  },
}
