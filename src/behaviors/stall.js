export const STALL = {
  $create: function(entity, options) {
    entity.stallSpeed = 1

    entity.stall = () => {
      if (entity.preventStall) {
        return
      }

      entity.preventStall = true

      entity.scene.tweens.addCounter({
        from: entity.stallSpeed,
        to: 0,
        duration: 500,
        onComplete: () => {
          entity.stalled = true
          entity.turnCounter = 0
          entity.emit('stall')
        },
        onUpdate: tween => (entity.stallSpeed = tween.getValue()),
      })

      entity.scene.time.addEvent({
        delay: 2000,
        callback: () => {
          entity.stalled = false
          entity.emit('unstall')

          entity.scene.tweens.addCounter({
            from: entity.stallSpeed,
            to: 1,
            duration: 500,
            onUpdate: tween => (entity.stallSpeed = tween.getValue()),
          })
        },
      })

      entity.scene.time.addEvent({
        delay: 3000,
        callback: () => (entity.preventStall = false),
      })
    }
  },

  postUpdate(entity) {
    if (!entity.stalled) {
      if (entity.rDelta > 0) {
        if (entity.turnCounterDirection === 1) {
          entity.turnCounter = 0
        }
        entity.turnCounterDirection = 0
        entity.turnCounter++
      } else {
        if (entity.turnCounterDirection === 0) {
          entity.turnCounter = 0
        }
        entity.turnCounterDirection = 1
        entity.turnCounter++
      }
    }

    if (entity.turnCounter > 120) {
      entity.stall()
    }
  },
}
