export const STALL = {
  options: {
    stallTimeout: 120,
  },
  $create: function (entity, opts) {
    entity.stallSpeed = 1
    entity.stallTimeout = opts.stallTimeout
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
        onUpdate: (tween) => (entity.stallSpeed = tween.getValue()),
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
            onUpdate: (tween) => (entity.stallSpeed = tween.getValue()),
          })
        },
      })
      entity.scene.time.addEvent({
        delay: 3000,
        callback: () => (entity.preventStall = false),
      })
    }
  },
  update(entity) {
    if (!entity.active || !entity.target.active) {
      return
    }
    const opposite = entity.rDelta > 0 ? 1 : 0
    if (!entity.stalled) {
      if (entity.turnCounterDirection === opposite) {
        entity.turnCounter = 0
      }
      entity.turnCounterDirection = entity.rDelta > 0 ? 0 : 1
      if (
        entity.stallTimeout > 0 &&
        entity.turnCounter++ > entity.stallTimeout
      ) {
        entity.stall()
      }
    }
  },
}
