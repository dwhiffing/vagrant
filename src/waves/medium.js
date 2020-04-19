import { makeRandom, makeWall } from './utils'

const WAVES = [
  {
    rocks: [
      makeRandom({
        waveDelay: 300,
        size: 30,
        type: 1,
        directions: ['tr', 'bl'],
      }),
    ],
    missiles: [
      makeRandom({
        waveDelay: 1000,
        size: 10,
        type: 2,
        directions: ['t', 'b', 'l', 'r'],
      }),
    ],
  },
  {
    rocks: [
      makeRandom({ waveDelay: 100, size: 20, type: 1, directions: ['t', 'b'] }),
    ],
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
    rocks: [makeRandom({ waveDelay: 500, size: 20, type: 0 })],
    missiles: [
      makeRandom({
        waveDelay: 500,
        size: 30,
        type: 0,
        directions: ['t', 'b', 'l', 'r'],
      }),
    ],
  },
]

const EVENTS = [
  {
    rocks: [
      makeWall({ directions: ['r'], incX: 150, size: 8, type: 0 }),
      makeWall({ directions: ['l'], incX: 150, size: 8, type: 0 }),
      makeWall({ directions: ['t'], incY: 0, size: 8, type: 0 }),
      makeWall({ directions: ['b'], incY: 0, size: 8, type: 0 }),
    ],
    missiles: [],
  },
  {
    rocks: [makeWall({ direction: 'l' }), makeWall({ direction: 'r' })],
    missiles: [],
  },
  {
    rocks: [makeWall({ direction: 't' }), makeWall({ direction: 'b' })],
    missiles: [],
  },
]

export default [WAVES, EVENTS]
