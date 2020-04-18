export const SMOKE = {
  options: {
    speed: 0,
    frequency: 250,
    scale: { start: 0.1, end: 0.4 },
    lifespan: 1000,
    alpha: { start: 0.3, end: 0 },
  },

  $create: function (entity, options) {
    var particles = entity.scene.add.particles('smoke')
    entity.smoke = particles.createEmitter({
      ...options,
      key: null,
    })
    entity.smoke.setBlendMode(Phaser.BlendModes.ADD)
    entity.smoke.startFollow(entity)
    entity.on('spawn', () => entity.smoke.start())
    entity.on('kill', () => entity.smoke.stop())
    entity.on('stall', () => entity.smoke.stop())
    entity.on('unstall', () => entity.smoke.start())
  },
}

export const SMOKE_TYPES = {
  normal: {
    speed: 0,
    frequency: 250,
    scale: { start: 0.1, end: 0.4 },
    lifespan: 1000,
    alpha: { start: 0.3, end: 0 },
  },
  fast: {
    speed: 0,
    frequency: 100,
    scale: { start: 0.1, end: 0.4 },
    lifespan: 800,
    alpha: { start: 0.3, end: 0 },
  },
  big: {
    speed: 0,
    frequency: 500,
    scale: { start: 0.4, end: 0.9 },
    lifespan: 1000,
    alpha: { start: 0.3, end: 0 },
  },
}
