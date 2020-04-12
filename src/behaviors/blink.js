export const BLINK = {
  options: {},

  $create: function (entity) {
    entity.on('fire', () => {
      entity.blinkEvent && entity.blinkEvent.destroy()
    })
    entity.on('blink', () => {
      entity.blinkEvent = entity.scene.time.addEvent({
        delay: 150,
        repeat: 10,
        callback: () => {
          if (entity.isTinted) {
            entity.clearTint()
          } else {
            entity.setTintFill(0xffffff)
          }
        },
      })
    })
  },
}
