import Phaser from 'phaser'
import BehaviorPlugin from './behavior'
import * as scenes from './scenes'

const game = new Phaser.Game({
  transparent: true,
  type: Phaser.AUTO,
  parent: 'phaser-example',
  backgroundColor: '#fff',
  width: window.document.documentElement.clientWidth,
  height: window.document.documentElement.clientHeight,
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
