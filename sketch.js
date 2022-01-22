var torre, torreImg
var portaImg, cercaImg
var fantasma, fantasmaImg
var cercaInvisivel
var portaGrupo,cercaGrupo,cercaInvisivelGrupo
var estadoDoJogo="inicio"
var som

function portas(){
    if(frameCount % 240===0){
        var porta=createSprite(50,-100,50,50)
        porta.velocityY=1
        porta.x=Math.round(random(100,500))
        porta.addImage(portaImg)
        porta.lifeTime=800
        portaGrupo.add(porta)

        var cerca=createSprite(50,-45,50,50)
        cerca.velocityY=1
        cerca.x=porta.x
        cerca.addImage(cercaImg)
        cercaGrupo.add(cerca)

        cercaInvisivel=createSprite(50,-40,50,2)
        cercaInvisivel.velocityY=1
        cercaInvisivel.x=porta.x
        cercaInvisivel.visible=false;
        cercaInvisivelGrupo.add(cercaInvisivel)

        fantasma.depth=porta.depth
        fantasma.depth+=1
    }
}

function setup(){
    createCanvas(600,600)

    som.loop()

    torre=createSprite(300,300,600,600)
    torre.addImage(torreImg)
    torre.velocityY=1

    fantasma=createSprite(300,300,50,50)
    fantasma.addImage(fantasmaImg)
    fantasma.scale=0.3

    portaGrupo=new Group()
    cercaGrupo=new Group()
    cercaInvisivelGrupo=new Group()
}

function draw(){
    background("black")

    if(estadoDoJogo==="inicio"){
        if(torre.y>600){
            torre.y=300
        }
    
        if(keyDown("right_arrow")){
            fantasma.x=fantasma.x+3
        }
    
        if(keyDown("left_arrow")){
            fantasma.x=fantasma.x-3
        }
        
        if(keyDown("space")){
            fantasma.velocityY=-10
        }
        fantasma.velocityY+=0.8
    
        if(fantasma.isTouching(cercaInvisivelGrupo)||fantasma.y>620){
            fantasma.destroy()
            portaGrupo.setVelocityYEach(0)
            cercaGrupo.setVelocityYEach(0)
            cercaInvisivelGrupo.setVelocityYEach(0)
            estadoDoJogo="fim"
        }
    
        if(fantasma.isTouching(cercaGrupo)){
            fantasma.velocityY=0
        }

        portas()
    drawSprites()
    }

    

    if(estadoDoJogo==="fim"){
        textSize(60)
        text("Você perdeu!!! :(",90,300)

    }
}

function preload(){
    torreImg=loadImage("tower.png")
    portaImg=loadImage("door.png")
    cercaImg=loadImage("climber.png")
    fantasmaImg=loadImage("ghost-standing.png")
    som=loadSound("spooky.wav")

}