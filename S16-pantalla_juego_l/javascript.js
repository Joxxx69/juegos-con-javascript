let canvas;
let contexto;
let fps = 50;

const inicializa =() =>{
    canvas = document.getElementById('canvas');
    contexto = canvas.getContext('2d');
    
    setInterval(() => {
        principal();
        }, 1000/fps);
}

const Personaje = function(x,y){
    this.x =x;
    this.y = y;
    this.derecha = true;

    this.dibuja = function(){
        contexto.fillstyle = 'red';
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
    console.log('ejecutando')
}

const personaje1 = new Personaje(10,20);
const personaje2 = new Personaje(100,200);
const personaje3 = new Personaje(50,250);


