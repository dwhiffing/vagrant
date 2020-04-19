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

const makeWall = ({ delay = 1, size, type = 0, ...opts }) => ({
  delay,
  type: 'wall',
  opts: { size: size, type, ...opts },
})

export const EASY_WAVE = [
  {
    rocks: [
      makeSpecific({ waveDelay: 500, size: 20, type: 0, vertical: false }),
    ],
    missiles: [
      makeSpecific({ waveDelay: 1000, size: 10, type: 0, vertical: true }),
    ],
  },
]

export const EASY_EVENT_WAVE = [
  {
    rocks: [makeWall({ isRight: false }), makeWall({ isRight: true })],
    missiles: [],
  },
]

export const MEDIUM_WAVE = [
  {
    rocks: [
      makeSpecific({ waveDelay: 100, size: 20, type: 1, vertical: false }),
    ],
    missiles: [
      makeSpecific({ waveDelay: 100, size: 10, type: 1, vertical: true }),
    ],
  },
]

export const MEDIUM_EVENT_WAVE = [
  {
    rocks: [makeWall({ isRight: false }), makeWall({ isRight: true })],
    missiles: [],
  },
]

export const HARD_WAVE = [
  {
    rocks: [
      makeSpecific({ waveDelay: 100, size: 20, type: 1, vertical: false }),
    ],
    missiles: [
      makeSpecific({ waveDelay: 100, size: 10, type: 1, vertical: true }),
    ],
  },
]

export const HARD_EVENT_WAVE = [
  {
    rocks: [makeWall({ isRight: false }), makeWall({ isRight: true })],
    missiles: [],
  },
]

export const EASY_WAVES = [EASY_WAVE, EASY_WAVE, EASY_EVENT_WAVE]

export const MEDIUM_WAVES = [MEDIUM_WAVE, MEDIUM_WAVE, MEDIUM_EVENT_WAVE]

export const HARD_WAVES = [HARD_WAVE, HARD_WAVE, HARD_EVENT_WAVE]
