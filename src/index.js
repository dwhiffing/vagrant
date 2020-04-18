import Phaser from 'phaser'
import BehaviorPlugin from './behavior'
import * as scenes from './scenes'

const { clientWidth, clientHeight } = window.document.documentElement

const isDesktop = clientWidth > 1200 && clientHeight > 800

const game = new Phaser.Game({
  transparent: true,
  type: Phaser.AUTO,
  parent: 'phaser-example',
  backgroundColor: '#fff',
  width: isDesktop ? 1920 : 1080,
  height: 1920,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  plugins: {
    global: [{ key: 'BehaviorPlugin', plugin: BehaviorPlugin, start: true }],
  },
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
    },
  },
  scene: Object.values(scenes),
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
})

export default game
