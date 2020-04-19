import { makeRandom, makeWall } from './utils'

const WAVES = [
  {
    rocks: [],
    missiles: [
      makeRandom({
        waveDelay: 300,
        size: 10,
        type: 1,
        directions: ['t', 'b', 'l', 'r'],
      }),
    ],
  },
  {
    rocks: [makeRandom({ waveDelay: 100, size: 20, type: 1 })],
    missiles: [
      makeRandom({
        waveDelay: 100,
        size: 10,
        type: 1,
        directions: ['t', 'b'],
      }),
    ],
  },
]

const EVENTS = [
  {
    rocks: [makeWall({ directions: ['r', 'l'], incX: 150, size: 8, type: 0 })],
    missiles: [],
  },
  {
    rocks: [makeWall({ direction: 'l' }), makeWall({ direction: 'r' })],
    missiles: [],
  },
]

export default [WAVES, EVENTS]
