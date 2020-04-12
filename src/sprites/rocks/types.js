export const BASE = {
  score: 10,
  health: 20,
  frame: 1,
  scale: 1.5,
  speed: 100,
  explosionDelay: 0,
  triggerRadius: 100,
  explosionRadius: 100,
  explosionDamage: 10,
}

export const TYPES = {
  normal: {
    ...BASE,
  },
  fast: {
    ...BASE,
    speed: 300,
    triggerRadius: 50,
    explosionRadius: 50,
    explosionDamage: 5,
    frame: 0,
    scale: 1,
  },
  big: {
    ...BASE,
    health: 40,
    speed: 50,
    triggerRadius: 120,
    explosionRadius: 120,
    explosionDamage: 30,
    frame: 2,
    scale: 2.5,
  },
}
