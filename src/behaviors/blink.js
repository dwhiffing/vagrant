export const BLINK = {
  $create: function (entity, options) {
    entity.on('spawn', () => {
      if (entity.blinkEvent) entity.blinkEvent.destroy()
      entity.clearTint()
    })
    entity.on('kill', () => {
      if (entity.blinkEvent) entity.blinkEvent.destroy()
      entity.clearTint()
    })
    entity.on('blink', (opts = {}) => {
      let i = 0
      entity.blinkEvent = entity.scene.time.addEvent({
        delay: opts.blinkRate,
        repeat: opts.blinkRepeat,
        callback: () => {
          if (i++ === opts.blinkRepeat + 1) {
            opts.onBlinkComplete && opts.onBlinkComplete()
            entity.clearTint()
            return
          }
          if (opts.useAlpha) {
            entity.alpha = entity.alpha === 1 ? 0.2 : 1
          } else {
            if (entity.isTinted) {
              entity.clearTint()
            } else {
              entity.setTintFill(0xffffff)
            }
          }
        },
      })
    })
  },
}
