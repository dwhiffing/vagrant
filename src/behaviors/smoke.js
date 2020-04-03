export const SMOKE = {
  options: {
    speed: 0,
    frequency: 50,
    scale: { start: 0.4, end: 0.3 },
    lifespan: { min: 200, max: 300 },
    alpha: { start: 0.6, end: 0 },
  },
  $create: function(entity, options) {
    var particles = entity.scene.add.particles('smoke')
    entity.smoke = particles.createEmitter({
      ...options,
      key: null,
    })
    entity.smoke.setBlendMode(Phaser.BlendModes.ADD)
    entity.smoke.startFollow(entity)
    entity.on('fire', () => entity.smoke.start())
    entity.on('destroy', () => entity.smoke.stop())
    entity.on('stall', () => entity.smoke.stop())
    entity.on('unstall', () => entity.smoke.start())
  },
}
