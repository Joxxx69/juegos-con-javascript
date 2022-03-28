let canvas;
let contexto;
let fps = 50;
let imgRex;

const inicializa =() =>{
    canvas = document.getElementById('canvas');
    contexto = canvas.getContext('2d');

    //imagen cargada de rex
    imgRex = new Image();
    imgRex.src = './image/mario.png'
    
    setInterval(() => {
        principal();
        }, 1000/fps);
}

const Protagonista = function(x,y){
    this.x=x;
    this.y =y;
    this.velocidad =3;
    this.dibuja = function(){
        //contexto.drawImage(imgRex,x,y, width, heigth)
        contexto.drawImage(imgRex, this.x, this.y)
    }
    this.texto = function(){
        contexto.font = '30px impact'
        contexto.fillStyle = 'gray';
        contexto.fillText(`x: ${this.x}  y: ${this.y}`,300,30)
    }

    this.arriba = function(){
        this.y -= this.velocidad;
    }
    this.abajo = function(){
        this.y += this.velocidad;
    }
    this.izquierda = function(){
        this.x -= this.velocidad;
    }
    this.derecha = function(){
        this.x += this.velocidad;
    }

}

const Personaje = function(x,y){
    this.x =x;
    this.y = y;
    this.derecha = true;

    this.dibuja = function(){
        contexto.fillStyle = 'red';
        contexto.fillRect(this.x, this.y, 50,50)
    }

    this.mueve = function(velocidad){
        if(this.derecha){
            if(this.x < 350){
                this.x+= velocidad;
            }else{
                this.derecha = false;
            }
        }else{
            if(this.x > 0){
                this.x-=velocidad;
            }else{
                this.derecha = true;
            }
        }
    }
}

const borraCanvas =()=>{
    canvas.width = 400;
    canvas.height = 300;
}

const principal =()=>{
    borraCanvas();
    personaje1.dibuja();
    personaje2.dibuja();
    personaje3.dibuja();
    personaje1.mueve(1)
    personaje2.mueve(2)
    personaje3.mueve(3)

    prota.dibuja()
    prota.texto();
    console.log('ejecutando')
}

const personaje1 = new Personaje(10,20);
const personaje2 = new Personaje(100,200);
const personaje3 = new Personaje(50,250);

const  prota =new Protagonista(1,2);


document.addEventListener('keydown', (tecla)=>{
    switch (tecla.code) {
        case 'ArrowUp':
            prota.arriba();
            console.log('ArrowUp')
            break;
        case 'ArrowDown':
            prota.abajo();
            console.log('ArrowDown')
            break;
        case 'ArrowLeft':
            prota.izquierda();
            console.log('ArrowLeft')
            break;
        case 'ArrowRight':
            prota.derecha();
            console.log('ArrowRight')
            break;
    }
})