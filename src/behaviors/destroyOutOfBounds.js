export const DESTROY_OUT_OF_BOUNDS = {
  options: {},
  update: (entity) => {
    if (
      entity.active &&
      (entity.x < -300 ||
        entity.x > entity.scene.cameras.main.width + 300 ||
        entity.y < -300 ||
        entity.y > entity.scene.cameras.main.height + 300)
    ) {
      entity.kill()
    }
  },
}
