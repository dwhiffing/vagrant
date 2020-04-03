const WOBBLE_LIMIT = 15
const WOBBLE_SPEED = 1000

export const WOBBLE = {
  $create: function(entity, opts) {
    entity.wobble = WOBBLE_LIMIT
    entity.scene.tweens.addCounter({
      from: -WOBBLE_LIMIT,
      to: WOBBLE_LIMIT,
      duration: WOBBLE_SPEED,
      loop: -1,
      onUpdate: tween => {
        entity.wobble = tween.getValue()
      },
    })
  },
}
