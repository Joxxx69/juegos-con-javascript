let canvas;
let contexto;
let protagonista;

const fps=50;
const anchoF = 40;
const altoF = 20;
const cesped = '#8BDA20';
const puerta = 'brown';
const tierra = '#C69E0A';
const llave = 'gold'




const escenario = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,0,0,0,2,2,2,2,0,0,2,2,0],
    [0,0,2,2,2,2,2,0,0,2,0,0,2,0,0],
    [0,0,2,0,0,0,2,2,0,2,2,2,2,0,0],
    [0,0,2,2,2,0,0,2,0,0,0,2,0,0,0],
    [0,2,2,0,0,0,0,2,0,0,0,2,0,0,0],
    [0,0,2,0,0,0,2,2,2,0,0,2,2,2,0],
    [0,2,2,2,0,0,2,0,0,0,1,0,0,2,0],
    [0,2,2,3,0,0,2,0,0,2,2,2,2,2,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ];

const posicionesRandom =()=>{
    let randomposicion= [];
    for (let x = 0; x < escenario.length; x++) {
        for (let y = 0; y < escenario[x].length; y++) { 
            if(escenario[x][y]===2){
                randomposicion.push(`${x},${y}`)
            }
             
        }    
    }
    return (randomposicion);
}


const dibujaEscenario = () => {
    let color;
    for (let x = 0; x < escenario.length; x++) {
        for (let y = 0; y < escenario[x].length; y++) {
            if(escenario[x][y]===0){
                color= cesped;
            }           
            if(escenario[x][y]===1){
                color= puerta;
            }           
            if(escenario[x][y]===2){
                color = tierra;
            }   
            if(escenario[x][y]===3){
                color = llave;
            }
            contexto.fillStyle =color;      
            contexto.fillRect(x*anchoF, y* altoF, anchoF, altoF )  
        }    
    }
}

// OBJETO JUGADOR
const jugador = function(){
    this.x =1;
    this.y = 1;
    this.color = 'red';
    this.llave = false;


    this.margenes = (x,y)=>escenario[x][y]===0;

    this.dibuja = ()=>{
        contexto.fillStyle = this.color;
        contexto.fillRect(this.x * anchoF, this.y * altoF, anchoF, altoF)
    }

    this.arriba = ()=>{
        if(!this.margenes(this.x,this.y-1)){
            this.y--;
            this.logicaObjetos();
        }
    }
    this.abajo = ()=>{
        if(!this.margenes(this.x,this.y+1)){
            this.y++;
            this.logicaObjetos();
        }
    }
    this.izquierda = ()=>{
        if(!this.margenes(this.x-1,this.y)){
            this.x--;
            this.logicaObjetos();
        }
    }
    this.derecha = ()=>{
        if(!this.margenes(this.x+1,this.y)){
            this.x++;
            this.logicaObjetos();
        }
    }

    this.victoria = ()=>{
        console.log('has ganado la partida');
        const posiciones = posicionesRandom();
        const posicionString =posiciones[Math.floor(Math.random()*(0+53))+0];
        const llavepossicion = posicionString.split(',');
        this.x =1 ;
        this.y =1;
        this.xllave=parseInt(llavepossicion[0]);
        this.yllave=parseInt(llavepossicion[1]);
        this.llave = false;
        escenario[this.x][this.y]= 2;
        escenario[this.xllave][this.yllave]=3;
    }

    this.logicaObjetos=()=>{
        let objeto = escenario[this.x][this.y];

        // obtencion de la llave
        if(objeto === 3){
            this.llave = true;
            escenario[this.x][this.y] = 2;
            console.log(`has obtenido la llave especial !!!!`);
        }

        // abrimos la puerta
        if(objeto ===1){
            if(this.llave ==true){
                this.victoria();
            }else{
                console.log('busca la llave')
            }
        }
    }

}

// class Jugador{
//     constructor(){
//         this.x =1;
//         this.y =1;
//     }
// }

// LECTURA DEL TECLADO

const inicializa=()=>{
    
    canvas = document.getElementById('canvas');
    contexto = canvas.getContext('2d');
    
    // creacion del jugador
    protagonista = new jugador();

    document.addEventListener('keydown',tecla=>{
        switch (tecla.code) {
            case 'ArrowUp':
                protagonista.arriba();
                break;
            case 'ArrowDown':
                protagonista.abajo();
                break;
            case 'ArrowLeft':
                protagonista.izquierda();
                break;
            case 'ArrowRight':
                protagonista.derecha();
                break;
        }
    })
    
    setInterval(() => {
        
        principal();
    }, 1000/fps);
};



const borraCanvas =()=>{
    canvas.width = 400;
    canvas.height = 300;
}


const principal =()=>{
    borraCanvas();
    dibujaEscenario();
    protagonista.dibuja();
}

