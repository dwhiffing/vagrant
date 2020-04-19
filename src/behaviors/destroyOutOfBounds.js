export const DESTROY_OUT_OF_BOUNDS = {
  options: {
    range: 120,
  },
  update: (entity, opts) => {
    if (!entity.active) return
    const { width, height } = entity.scene.cameras.main
    const { x: vX, y: vY } = entity.body.velocity
    const one =
      (vX < 0 && entity.x < -opts.range) ||
      (vX > 0 && entity.x > width + opts.range)
    const two =
      (vY < 0 && entity.y < -opts.range) ||
      (vY > 0 && entity.y > height + opts.range)
    if (one || two) {
      entity.kill()
    }
  },
}
