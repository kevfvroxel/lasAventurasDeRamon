/* global Phaser */

import { createAnimations } from "./animations.js"

const config = {
  autoFocus: false,
  type: Phaser.AUTO, // webgl, canvas
  width: 1920,
  height: 900,
  backgroundColor: '#049cd8',
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true
    }
  },
  scene: {
    preload, // se ejecuta para precargar recursos
    create, // se ejecuta cuando el juego comienza
    update // se ejecuta en cada frame
  }
}

new Phaser.Game(config)
// this -> game -> el juego que estamos construyendo

function preload () {
  this.load.image(
    'cloud1',
    'assets/scenery/overworld/cloud1.png'
  )

  this.load.image(
    'floorbricks',
    'assets/scenery/overworld/floorbricks.png'
  )

  this.load.image(
    'pipe1',
    'assets/scenery/pipe1.png'
  )

  this.load.spritesheet(
    'goomba',
    'assets/entities/overworld/goomba.png',
    { frameWidth: 16, frameHeight: 16 }
  )
  this.load.spritesheet(
    'mario', // <--- id
    'assets/entities/mario.png',
    { frameWidth: 18, frameHeight: 16 }
  )

  this.load.audio('gameover', 'assets/sound/music/gameover.mp3')
} // 1.

function create () {
  // image(x, y, id-del-asset)
  this.add.image(100, 50, 'cloud1')
    .setOrigin(0, 0)
    .setScale(0.15)

  this.floor = this.physics.add.staticGroup()

  this.floor
    .create(0, config.height - 32, 'floorbricks')
    .setOrigin(0, 0.5)
    .setScale(2)
    .refreshBody()

  this.floor
    .create(350, config.height - 32, 'floorbricks')
    .setOrigin(0, 0.5)
    .setScale(2)
    .refreshBody()

  this.floor
    .create(460, config.height - 112, 'pipe1')
    .setOrigin(0.5, 0.5)
    .setScale(2)
    .refreshBody()

  

    
   //baneen a manu

  this.mario = this.physics.add.sprite(50, 100, 'mario')
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)
    .setGravityY(300)
    .setScale(2)

  this.enemy = this.physics.add.sprite(120, - 64, 'goomba')
    .setScale(2)
    .setOrigin(0,1)
    .setGravityY(300)
    .setGravityX(-50)
  

  this.physics.world.setBounds(0, 0, 2000, config.height)
  this.physics.add.collider(this.mario, this.floor)
  this.physics.add.collider(this.mario, this.pipe1)

  this.cameras.main.setBounds(0, 0, 2000, config.height)
  this.cameras.main.startFollow(this.mario)

  createAnimations(this)

  this.keys = this.input.keyboard.createCursorKeys()
}

function update () { // 3. continuamente
  if (this.mario.isDead) return

  if (this.keys.left.isDown) {
    this.mario.body.touching.down && this.mario.anims.play('mario-walk', true)
    this.mario.x -= 2
    this.mario.flipX = true
  } else if (this.keys.right.isDown) {
    this.mario.body.touching.down && this.mario.anims.play('mario-walk', true)
    this.mario.x += 2
    this.mario.flipX = false
  } else if(this.mario.body.touching.down){
    this.mario.anims.play('mario-idle', true)
  }

  if (this.keys.up.isDown && this.mario.body.touching.down) {
    this.mario.setVelocityY(-400)
    this.mario.anims.play('mario-jump', true)
  }

  if (this.mario.y >= config.height) {
    this.mario.isDead = true
    this.mario.anims.play('mario-dead')
    this.mario.setCollideWorldBounds(false)
    this.sound.add('gameover', { volume: 0.2 }).play()

    setTimeout(() => {
      this.mario.setVelocityY(-350)
    }, 100)

    setTimeout(() => {
      this.scene.restart()
    }, 2000)
  }
}