import { Missile } from '../sprites/missles/Missile'

export const SPAWN = {
  options: {
    waves: [],
  },

  $create: function (entity, opts) {
    entity.createMultipleCallback = (entries) =>
      entries.forEach((e) => e.init(0))
    entity.createMultiple({
      frameQuantity: 20,
      key: opts.key,
      active: false,
      visible: false,
      classType: opts.classType,
      setXY: { x: -100, y: -100 },
    })
    entity.createMultipleCallback = (entries) =>
      entries.forEach((e) => e.init(1))
    entity.createMultiple({
      frameQuantity: 20,
      key: opts.key,
      active: false,
      visible: false,
      classType: opts.classType,
      setXY: { x: -100, y: -100 },
    })
    entity.createMultipleCallback = (entries) =>
      entries.forEach((e) => e.init(2))
    entity.createMultiple({
      frameQuantity: 20,
      key: opts.key,
      active: false,
      visible: false,
      classType: opts.classType,
      setXY: { x: -100, y: -100 },
    })

    const containerWidth = entity.scene.cameras.main.width
    const containerHeight = entity.scene.cameras.main.height

    entity.spawn = (x, y, type) => {
      let child = entity.getChildren().find((c) => !c.active && c.type === type)
      if (child) {
        child.spawn(x, y)
      }
    }

    entity.getRandomPosition = (params = {}) => {
      let x, y
      if (params.vertical) {
        x = Phaser.Math.RND.between(80, containerWidth - 80)
        y = Math.random() < 0.5 ? containerHeight + 80 : -80
      } else {
        x = Math.random() < 0.5 ? containerWidth + 80 : -80
        y = Phaser.Math.RND.between(80, containerHeight - 80)
      }

      return [x, y]
    }

    entity.spawnRandom = ({ size = 1, delay = 0, vertical = false }) => {
      for (let i = 0; i < size; i++) {
        const [x, y] = entity.getRandomPosition({ vertical })
        entity.scene.time.addEvent({
          delay: delay * i,
          callback: () => entity.spawn(x, y),
          callbackScope: entity,
        })
      }
    }

    entity.spawnSpecific = ({ types, delay = 0, vertical = false }) => {
      types.forEach((type, index) => {
        const [x, y] = entity.getRandomPosition({ vertical })
        entity.scene.time.addEvent({
          delay: delay * index,
          callback: () => entity.spawn(x, y, type),
          callbackScope: entity,
        })
      })
    }

    entity.spawnWall = ({ size = 12, type = 0, isRight = false }) => {
      if (typeof isRight !== 'boolean') {
        isRight = Math.random() < 0.5
      }
      const x = isRight ? containerWidth + 80 : -80
      const inc = containerHeight / size
      for (let i = 0; i < containerHeight; i += inc) {
        entity.spawn(x, i, type)
      }
    }

    entity.spawnDiagonalWall = ({ size = 12, type = 0, isRight = false }) => {
      const inc = containerHeight / size
      for (let j = 0; j > inc * -20; j -= inc) {
        entity.spawn(j, j * -1, type)
      }
    }

    entity.spawnWave = ({ type, opts = {} }) => {
      if (type === 'random') {
        entity.spawnRandom(opts)
      }
      if (type === 'specific') {
        entity.spawnSpecific(opts)
      }
      if (type === 'wall') {
        entity.spawnWall(opts)
      }
      if (type === 'diagonalWall') {
        entity.spawnDiagonalWall(opts)
      }
    }
  },
}
