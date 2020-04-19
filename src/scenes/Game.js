import { Missiles } from '../sprites/missiles'
import { Background } from '../sprites/Background'
import { Mines } from '../sprites/Mines'
import { Bot } from '../sprites/Bot'
import { Interface } from '../sprites/Interface'
import { Target } from '../sprites/Target'
import { Rocks } from '../sprites/rocks'
import { Items } from '../sprites/items'
import { EASY_WAVES, MEDIUM_WAVES, HARD_WAVES } from '../waves'
import sample from 'lodash/sample'

const MEDIUM_SCORE = 5000
const HARD_SCORE = 10000

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
  }

  init(opts) {
    this.lives = opts.lives || 3
    this.score = opts.score || 0
    this.iter = 0
    this.totalWaves = 0
  }

  create() {
    const { width, height } = this.game.canvas
    this.sendNextWave = this.sendNextWave.bind(this)
    this.behavior = this.plugins.get('BehaviorPlugin')
    this.waveIndex = -1
    this.waves = []
    this.bonusKillCount = 0
    this.bonusKillCountGoal = Phaser.Math.RND.between(6, 20)

    this.background = this.add.existing(new Background(this, width, height))

    this.target = this.add.existing(new Target(this, width / 2, height / 2))
    this.mines = new Mines(this)
    this.items = new Items(this)
    this.bot = this.add.existing(new Bot(this, width / 2, height / 2))

    this.missileGroup = new Missiles(this)
    this.rockGroup = new Rocks(this)

    this.interface = new Interface(this, this.lives, this.score)

    this.music = this.sound.add('game', { loop: true, volume: 0.35 })
    this.music.play()

    this.events.on('shake', ({ type = 'small' } = {}) => {
      if (type === 'small') {
        this.cameras.main.shake(200, 0.01)
        navigator.vibrate(100)
      } else if (type === 'medium') {
        this.cameras.main.shake(300, 0.02)
        navigator.vibrate(200)
      }
    })

    this.sendNextWave()
    this.time.addEvent({
      delay: 1000,
      callback: this.sendNextWave,
      callbackScope: this,
      loop: true,
    })

    this.physics.add.overlap(
      this.missileGroup,
      this.rockGroup,
      (obj1, obj2) => {
        if (obj1.active && obj2.active) {
          obj1.damage(obj2.explosionDamage, true, false)
          obj2.damage(obj1.explosionDamage, true, false)
        }
      },
    )

    this.physics.add.overlap(this.items, this.bot, (bot, item) => {
      if (bot.active && item.active) {
        item.kill()
        if (item.type === 0) {
          bot.heal(20)
        } else if (item.type === 1) {
          bot.givePower()
        } else if (item.type === 2) {
          bot.giveShield()
        } else if (item.type === 3) {
          this.events.emit('score', { amount: 1000 })
          bot.emit('score', { amount: 1000 })
        }
      }
    })

    this.events.on('gameOver', () => {
      this.music.stop()
      this.scene.start('Menu', { score: this.interface.score })
    })

    this.touch = { x: width / 2, y: height / 2 }
    this.last = { x: this.touch.x, y: this.touch.y }
    this.input.addPointer(2)

    this.input.keyboard.on('keydown-SPACE', () => {
      this.mines.spawn(this.bot.x, this.bot.y)
    })

    this.input.on('pointerdown', ({ x, y, id, wasTouch }) => {
      if (id === 1) {
        this.last = { x: this.target.x, y: this.target.y }
        this.touch = { x, y }
      }
      if (
        (!wasTouch || (id === 2 && this.input.pointer1.isDown)) &&
        y < height - 150
      ) {
        this.mines.spawn(this.bot.x, this.bot.y)
      }
    })

    this.input.on('pointermove', ({ x, y, id }) => {
      if (!this.input.activePointer.wasTouch) {
        return this.target.setPosition(x, y)
      }

      if (id === 1) {
        const dX = this.last.x + (x - this.touch.x) * 2
        const dY = this.last.y + (y - this.touch.y) * 2
        this.target.setPosition(dX, dY)
      }
    })
  }

  sendNextWave() {
    if (this.missileGroup.getFirstAlive() || this.rockGroup.getFirstAlive()) {
      return
    }
    if (!this.waves[this.waveIndex + 1]) {
      this.waveIndex = -1
      let waves = EASY_WAVES
      if (this.interface.score > MEDIUM_SCORE) {
        waves = MEDIUM_WAVES
      } else if (this.interface.score > HARD_SCORE) {
        waves = HARD_WAVES
      }
      this.waves = waves.map((wave) => sample(wave))
    }
    this.totalWaves++
    this.waveIndex++
    this.events.emit('wave')

    const { rocks, missiles } = this.waves[this.waveIndex] || {}

    const spawn = (group) => (spawn, index, spawns) => {
      const extraDelay = spawns
        .slice(0, index)
        .reduce((sum, spawn) => sum + (spawn.delay || 0), 0)
      this.time.addEvent({
        delay: extraDelay + (spawn.delay || 2000),
        callback: () => group.spawnWave(spawn),
        callbackScope: this,
      })
    }

    rocks.forEach(spawn(this.rockGroup))
    missiles.forEach(spawn(this.missileGroup))
  }

  update() {
    this.behavior.preUpdate()
    this.behavior.update()
    this.background.update()
  }
}
