import { makeRandom, makeWall } from './utils'

const FIRST_WAVE = [
  // 5 basic missiles, no rocks
  {
    rocks: [],
    missiles: [
      makeRandom({
        waveDelay: 1900,
        size: 5,
        type: 0,
        directions: ['t', 'b', 'l', 'r'],
      }),
    ],
  },
]

const WAVES = [
  {
    rocks: [makeRandom({ waveDelay: 2000, size: 8, type: 0 })],
    missiles: [
      makeRandom({
        waveDelay: 3000,
        size: 10,
        type: 0,
        directions: ['t', 'b'],
      }),
    ],
  },
  // vertical rocks and normal missiles
  {
    rocks: [
      makeRandom({
        waveDelay: 1000,
        size: 8,
        type: 0,
        directions: ['t', 'b'],
      }),
      makeRandom({
        waveDelay: 500,
        size: 10,
        type: 1,
        directions: ['t', 'b'],
      }),
    ],
    missiles: [makeRandom({ waveDelay: 4000, size: 6, type: 0 })],
  },
  // diagonal rocks and fast missiles
  {
    rocks: [
      makeRandom({
        waveDelay: 1000,
        size: 20,
        type: 0,
        directions: ['tl', 'br'],
      }),
    ],
    missiles: [
      makeRandom({
        waveDelay: 3000,
        size: 6,
        type: 1,
      }),
    ],
  },
  // horizontal rocks and small/big missiles
  {
    rocks: [
      makeRandom({
        waveDelay: 1000,
        size: 15,
        type: 0,
        directions: ['l', 'r'],
      }),
      makeRandom({
        waveDelay: 600,
        size: 20,
        type: 1,
        directions: ['l', 'r'],
      }),
    ],
    missiles: [
      makeRandom({ waveDelay: 3000, size: 6, type: 0 }),
      makeRandom({ waveDelay: 8000, size: 3, type: 2 }),
    ],
  },
]

const EVENTS = [
  {
    rocks: [
      makeRandom({
        waveDelay: 300,
        size: 30,
        type: 1,
        directions: ['tl', 'tr', 'br', 'bl'],
      }),
      makeRandom({
        waveDelay: 800,
        size: 10,
        type: 0,
        directions: ['l', 'r', 't', 'b'],
      }),
    ],
    missiles: [],
  },
  {
    rocks: [
      makeWall({ direction: 'r', size: 5 }),
      makeWall({ direction: 'r', offsetY: 150, delay: 2500, size: 5 }),
      makeWall({ direction: 'r', size: 5, delay: 2500 }),
      makeWall({ direction: 'r', offsetY: 150, delay: 2500, size: 5 }),
      makeWall({ direction: 'r', size: 5, delay: 2500 }),
      makeWall({ direction: 'r', offsetY: 150, delay: 2500, size: 5 }),
      makeWall({ direction: 'r', size: 5, delay: 2500 }),
    ],
    missiles: [
      makeRandom({
        delay: 5000,
        waveDelay: 500,
        size: 30,
        type: 0,
        directions: ['t', 'b'],
      }),
    ],
  },
]

const EASY_WAVES = [FIRST_WAVE, WAVES, EVENTS]

export default EASY_WAVES
