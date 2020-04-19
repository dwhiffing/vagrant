export const BASE = {
  score: 15,
  health: 20,
  frame: 1,
  scale: 1.5,
  speed: 180,
  size: 50,
  explosionDelay: 0,
  triggerRadius: 100,
  explosionRadius: 100,
  explosionDamage: 20,
}

export const TYPES = {
  normal: {
    ...BASE,
  },
  fast: {
    ...BASE,
    speed: 300,
    health: 10,
    score: 5,
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
    score: 75,
    triggerRadius: 120,
    explosionRadius: 120,
    explosionDamage: 30,
    frame: 2,
    scale: 2.5,
  },
}
