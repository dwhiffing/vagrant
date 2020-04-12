export const BLINK = {
  options: {
    blinkRate: 150,
    blinkRepeat: 13,
    useAlpha: false,
    onBlinkComplete: () => {},
  },

  $create: function (entity, options) {
    entity.onBlinkComplete = options.onBlinkComplete
    entity.on('fire', () => {
      entity.blinkEvent && entity.blinkEvent.destroy()
      entity.clearTint()
    })
    entity.on('blink', () => {
      let i = 0
      entity.blinkEvent = entity.scene.time.addEvent({
        delay: options.blinkRate,
        repeat: options.blinkRepeat,
        callback: () => {
          if (i++ === options.blinkRepeat) {
            entity.onBlinkComplete()
          }
          if (options.useAlpha) {
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
