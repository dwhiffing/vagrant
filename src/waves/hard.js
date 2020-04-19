import { makeRandom, makeWall } from './utils'

const WAVES = [
  {
    rocks: [
      makeRandom({
        waveDelay: 150,
        size: 40,
        type: 1,
        directions: ['tr', 'bl'],
      }),
    ],
    missiles: [
      makeRandom({
        waveDelay: 500,
        size: 20,
        type: 2,
        directions: ['t', 'b', 'l', 'r'],
      }),
    ],
  },
  {
    rocks: [
      makeRandom({ waveDelay: 50, size: 40, type: 1, directions: ['t', 'b'] }),
    ],
    missiles: [
      makeRandom({
        waveDelay: 150,
        size: 20,
        type: 1,
        directions: ['t', 'b', 'l', 'r'],
      }),
    ],
  },
  {
    rocks: [makeRandom({ waveDelay: 250, size: 40, type: 0 })],
    missiles: [
      makeRandom({
        waveDelay: 250,
        size: 40,
        type: 0,
        directions: ['t', 'b', 'l', 'r'],
      }),
    ],
  },
]

const EVENTS = [
  {
    rocks: [
      makeWall({ directions: ['r'], incX: 150, size: 15, type: 0 }),
      makeWall({ directions: ['l'], incX: 150, size: 15, type: 0 }),
      makeWall({ size: 5, directions: ['t'], incY: 0, type: 2 }),
      makeWall({ size: 5, directions: ['b'], incY: 0, type: 2 }),
    ],
    missiles: [],
  },
  {
    rocks: [
      makeWall({ type: 0, direction: 't' }),
      makeWall({ type: 2, size: 10, direction: 'l', delay: 1000 }),
      makeWall({ type: 0, direction: 'b' }),
      makeWall({ type: 2, size: 10, direction: 'r', delay: 1200 }),
    ],
    missiles: [],
  },
  {
    rocks: [
      makeWall({ type: 0, direction: 'l' }),
      makeWall({ type: 2, size: 5, direction: 't', delay: 1000 }),
      makeWall({ type: 0, direction: 'r' }),
      makeWall({ type: 2, size: 5, direction: 'b', delay: 1200 }),
    ],
    missiles: [],
  },
]

const FIRST_WAVE = [WAVES[0]]

export default [FIRST_WAVE, WAVES, EVENTS]
