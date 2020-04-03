export const EXPLODE = {
  options: {
    angle: 0,
    speed: 100,
    rotate: true,
  },

  update: function(entity, opts, game, dt) {
    const { x, y } = entity.scene.input.activePointer
    const missileGroup = entity.scene.missileGroup
    missileGroup
      .getChildren()
      .filter(s => s.active)
      .forEach(function(m) {
        const distance = Phaser.Math.Distance.Between(m.x, m.y, x, y)
        if (distance < 50) {
          m.destroy()
          entity.scene.explosionGroup.makeExplosion(m.x, m.y)
        }
      }, missileGroup)
  },
}
