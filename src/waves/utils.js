export const makeRandom = ({
  delay = 1,
  waveDelay = 200,
  size = 20,
  type = 0,
  ...opts
}) => ({
  type: 'random',
  delay,
  opts: {
    types: new Array(size).fill(type),
    delay: waveDelay,
    ...opts,
  },
})

export const makeWall = ({ delay = 1, size, type = 0, ...opts }) => ({
  delay,
  type: 'wall',
  opts: { size: size, type, ...opts },
})
