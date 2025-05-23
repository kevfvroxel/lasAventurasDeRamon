/* global Phaser */

import { createAnimations } from "./animations.js"

const config = {
  type: Phaser.AUTO, // webgl, canvas
  width: 1920,
  height: 900,
  backgroundColor: '#049cd8',
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 80 },
      debug: false
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

  this.load.spritesheet(
    'mario', // <--- id
    'assets/entities/mario.png',
    { frameWidth: 18, frameHeight: 16 }
  )
  //Agregamos este castillo
  this.load.image(
    'castle',
    'assets/scenery/castle.png'

  )
  this.load.image(
    'mastil',
    'assets/scenery/flag-mast.png'
  )
    this.load.image(
    'bandera',
    'assets/scenery/final-flag.png',
    
  )
  this.load.image(
    'boquemisterioso',
    'assets/blocks/overworld/misteryBlock.png'
  )
  this.load.image(
    'arbusto',
    'assets/scenery/overworld/bush1.png'
  )
   this.load.image(
    'block',
    'assets/blocks/overworld/block.png'
  )
    this.load.image(
    'pipe1',
    'assets/scenery/pipe1.png'
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
    .create(1250, config.height - 97, 'pipe1')
    .setOrigin(0.5, 0.5)
    .setScale(2)
    .refreshBody()

  this.floor
    .create(0, config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
     .setScale(2)
    .refreshBody()

  this.floor
    .create(150, config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
     .setScale(2)
    .refreshBody()
//agegamos dos pisos 
  this.floor
    .create(1550, config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
    .refreshBody()
     .setScale(2)
  this.floor
    .create(1679, config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
     .setScale(2)
    .refreshBody()
   this.floor
    .create(479, config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
     .setScale(2)
    .refreshBody()
     this.floor
    .create(720, config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
     .setScale(2)
    .refreshBody()
     this.floor
    .create(900, config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
     .setScale(2)
    .refreshBody()
    this.floor
    .create(1180, config.height - 16, 'floorbricks')
    .setOrigin(0, 0.5)
     .setScale(2)
    .refreshBody()

  
  
  //agregamos cstillo
  this.add.image(1750,692,'castle')
    .setOrigin(0, 0)
    .setScale(2)
  //agregamos bandera final y mastil
  this.add.image(1680,685,'mastil')
  .setScale(2)
  this.add.image(1667,552,'bandera')
  .setScale(2)
//agrego bloque misterioso 
 this.floor.create(200,800,'boquemisterioso')
  .setScale(2)
//agrego pasto
 this.add.image(100,835,'arbusto')
  .setScale(1)

  this.floor.create(660, 836, 'block')
  .setScale(2)
    this.floor.create(690, 806, 'block')
  .setScale(2)
    this.floor.create(720, 775, 'block')
  .setScale(2)
    this.floor.create(750, 745, 'block')
  .setScale(2)


    this.floor.create(690, 836, 'block')
  .setScale(2)
    this.floor.create(720, 806, 'block')
  .setScale(2)
    this.floor.create(750, 775, 'block')
  .setScale(2)
    this.floor.create(780, 745, 'block')
  .setScale(2)

    this.floor.create(720, 836, 'block')
  .setScale(2)
    this.floor.create(750, 806, 'block')
  .setScale(2)
    this.floor.create(780, 775, 'block')
  .setScale(2)
    this.floor.create(810, 745, 'block')
  .setScale(2)
  

    this.floor.create(750, 836, 'block')
  .setScale(2)
    this.floor.create(780, 806, 'block')
  .setScale(2)
    this.floor.create(810, 775, 'block')
  .setScale(2)


      this.floor.create(780, 836, 'block')
  .setScale(2)
    this.floor.create(810, 806, 'block')
  .setScale(2)
    this.floor.create(840, 775, 'block')
  .setScale(2)

        this.floor.create(810, 836, 'block')
  .setScale(2)
    this.floor.create(840, 806, 'block')
  .setScale(2)
     this.floor.create(870, 806, 'block')
  .setScale(2)

          this.floor.create(840, 836, 'block')
  .setScale(2)
          this.floor.create(870, 836, 'block')
  .setScale(2)
          this.floor.create(900, 836, 'block')
  .setScale(2)
  this.mario = this.physics.add.sprite(50, config.height - 80, 'mario')
    .setOrigin(0, 1)
    .setCollideWorldBounds(true)
    .setGravityY(300)
    .setScale(2)

  this.physics.world.setBounds(0, 0, 2000, config.height)
  this.physics.add.collider(this.mario, this.floor)

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
	}

  if (this.mario.isDead) return

  if (this.keys.left.isDown) {
    this.mario.body.touching.down && this.mario.anims.play('mario-walk', true)
    this.mario.x -= 2
    this.mario.flipX = true
  } else if (this.keys.right.isDown) {
    this.mario.body.touching.down && this.mario.anims.play('mario-walk', true)
    this.mario.x += 2
    this.mario.flipX = false
  } else {
    this.mario.anims.play('mario-idle', true)
  }

  if (this.keys.up.isDown && this.mario.body.touching.down) {
    this.mario.setVelocityY(-300)
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