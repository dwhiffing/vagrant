const makeSpecific = ({
  delay = 1,
  waveDelay = 200,
  size = 20,
  type = 0,
  ...opts
} = {}) => ({
  type: 'specific',
  delay,
  opts: {
    types: new Array(size).fill(type),
    delay: waveDelay,
    ...opts,
  },
})

const makeWall = ({ delay = 1, size = 20, type = 0, ...opts }) => ({
  delay,
  type: 'wall',
  opts: { size, type, ...opts },
})

export const NORMAL_WAVE = [
  {
    rocks: [
      makeSpecific({ waveDelay: 500, size: 20, type: 0, vertical: false }),
    ],
    missiles: [
      makeSpecific({ waveDelay: 1000, size: 10, type: 0, vertical: true }),
    ],
  },
  {
    rocks: [
      makeSpecific({ waveDelay: 100, size: 20, type: 1, vertical: false }),
    ],
    missiles: [
      makeSpecific({ waveDelay: 100, size: 10, type: 1, vertical: true }),
    ],
  },
]

export const STRONG_WAVE = [
  {
    rocks: [
      makeSpecific({ waveDelay: 1000, size: 10, type: 2, vertical: false }),
      makeSpecific({ waveDelay: 500, size: 20, type: 0, vertical: false }),
    ],
    missiles: [
      makeSpecific({ waveDelay: 1000, size: 7, type: 2, vertical: true }),
    ],
  },
]

export const ROCK_WALL = [
  {
    rocks: [makeWall({ isRight: false }), makeWall({ isRight: true })],
    missiles: [],
  },
]

export const WAVES = [
  NORMAL_WAVE,
  NORMAL_WAVE,
  ROCK_WALL,
  NORMAL_WAVE,
  NORMAL_WAVE,
  STRONG_WAVE,
]
