import { SMOKE_TYPES } from '../../behaviors/smoke'

export const BASE = {
  score: 10,
  health: 20,
  frame: 0,
  scale: 2,
  speed: 400,
  turnRate: 4,
  avoidRadius: 50,
  wobbleLimit: 20,
  wobbleSpeed: 450,
  stallTimeout: 120,
  stallDuration: 2000,
  stallRecharge: 3000,
  explosionDelay: 0,
  triggerRadius: 50,
  explosionRadius: 50,
  explosionDamage: 20,
  smoke: SMOKE_TYPES.normal,
}

export const TYPES = {
  normal: {
    ...BASE,
  },
  fast: {
    ...BASE,
    speed: 900,
    frame: 4,
    scale: 1,
    health: 5,
    turnRate: 10,
    explosionDamage: 10,
    smoke: SMOKE_TYPES.fast,
  },
  big: {
    ...BASE,
    explosionDamage: 50,
    speed: 200,
    frame: 1,
    health: 40,
    turnRate: 1.5,
    scale: 4,
    wobbleLimit: 35,
    wobbleSpeed: 2000,
    stallTimeout: 300,
    triggerRadius: 100,
    explosionRadius: 200,
    avoidRadius: 100,
    smoke: SMOKE_TYPES.big,
  },
}
