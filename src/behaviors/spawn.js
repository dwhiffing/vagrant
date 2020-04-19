const OFFSET = 100
export const SPAWN = {
  options: {
    waves: [],
  },

  $create: function (entity, opts) {
    const config = {
      key: opts.key,
      active: false,
      visible: false,
      classType: opts.classType,
      setXY: { x: -OFFSET, y: -OFFSET },
      setDepth: -1,
    }

    const containerWidth = entity.scene.cameras.main.width
    const containerHeight = entity.scene.cameras.main.height

    entity.spawn = (x, y, type, params = {}) => {
      let child = entity.getChildren().find((c) => !c.active && c.type === type)
      entity.createMultipleCallback = (entries) =>
        entries.forEach((e) => e.init(type))
      if (!child) {
        const entries = entity.createMultiple({ quantity: 1, ...config })
        child = entries[0]
        child.setDepth(2)
      }
      child.spawn(x, y, params)
    }

    entity.getRandomPosition = (params = {}) => {
      let x, y
      const direction = Phaser.Math.RND.shuffle(params.directions)[0]
      x = Phaser.Math.RND.between(OFFSET, containerWidth - OFFSET)
      y = Phaser.Math.RND.between(OFFSET, containerHeight - OFFSET)

      if (direction.match(/t/)) {
        y = containerHeight + OFFSET
      }
      if (direction.match(/b/)) {
        y = -OFFSET
      }
      if (direction.match(/l/)) {
        x = containerWidth + OFFSET
      }
      if (direction.match(/r/)) {
        x = -OFFSET
      }
      if (direction.match(/tl|bl|tr|br/)) {
        x += Phaser.Math.RND.between(-800, 800)
      }

      return [x, y, direction]
    }

    entity.spawnRandom = ({ types, delay = 0, directions = ['l', 'r'] }) => {
      types.forEach((type, index) => {
        const [x, y, direction] = entity.getRandomPosition({ directions })
        entity.scene.time.addEvent({
          delay: delay * index,
          callback: () => entity.spawn(x, y, type, { direction }),
          callbackScope: entity,
        })
      })
    }

    entity.spawnWall = ({
      size = 12,
      type = 0,
      offsetX = 0,
      offsetY = 0,
      incX = 0,
      incY = 0,
      direction = 'r',
      directions,
    }) => {
      if (directions) {
        direction = Phaser.Math.RND.shuffle(directions)[0]
      }
      const max =
        direction === 'l' || direction === 'r'
          ? containerHeight
          : containerWidth
      const inc = max / size
      let x = 0,
        y = 0
      if (direction === 'r') {
        x = -OFFSET
      } else if (direction === 'l') {
        x = containerWidth + OFFSET
      } else if (direction === 't') {
        y = containerHeight + OFFSET
      } else if (direction === 'b') {
        y = -OFFSET
      }

      for (let i = inc / 2; i < max; i += inc) {
        const vertical = direction === 't' || direction === 'b'
        const _x = vertical ? x + i : x
        const _y = !vertical ? y + i : y
        const _incX = incX * (i / inc)
        const _incY = incY * (i / inc)
        entity.spawn(
          _x + offsetX + (direction === 'l' ? _incX : -_incX),
          _y + offsetY + (direction === 't' ? _incY : -_incY),
          type,
          {
            direction,
          },
        )
      }
    }

    entity.spawnWave = ({ type, opts = {} }) => {
      if (type === 'random') {
        entity.spawnRandom(opts)
      }
      if (type === 'wall') {
        entity.spawnWall(opts)
      }
    }
  },
}
