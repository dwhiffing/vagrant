export const WOBBLE = {
  options: {
    wobbleLimit: 20,
    wobbleSpeed: 450,
  },
  $create: function (entity, opts) {
    entity.wobble = opts.wobbleLimit
    if (opts.wobbleLimit > 0) {
      entity.scene.tweens.addCounter({
        from: opts.wobbleLimit,
        to: -opts.wobbleLimit,
        ease: 'Sine.easeInOut',
        duration: opts.wobbleSpeed,
        loop: -1,
        yoyo: true,
        onUpdate: (tween) => {
          entity.wobble = tween.getValue()
        },
      })
    }
  },
}
