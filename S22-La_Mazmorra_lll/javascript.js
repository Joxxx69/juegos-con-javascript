let canvas;
let contexto;
let protagonista;
let tileMap;

const fps=50;
const anchoF = 40;
const altoF = 20;
const cesped = '#8BDA20';
const puerta = 'brown';
const tierra = '#C69E0A';
const llave = 'gold'


const enemigo =[]




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
    let randomArray= [];
    for (let x = 0; x < escenario.length; x++) {
        for (let y = 0; y < escenario[x].length; y++) { 
            if(escenario[x][y]===2){
                randomArray.push([x,y])
            }
             
        }    
    }
    return (randomArray);
}


const dibujaEscenario = () => {

    for (let x = 0; x < escenario.length; x++) {
        for (let y = 0; y < escenario[x].length; y++) {
            let tile = escenario[x][y];

            contexto.drawImage(tileMap, tile*32,0,32,32,anchoF*x,altoF*y,anchoF,altoF);



            // contexto.fillStyle =color;      
            // contexto.fillRect(x*anchoF, y* altoF, anchoF, altoF )  
        }    
    }
}



class Villano{

    constructor(x,y) {
        this.x =x;
        this.y=y;
        this.direccion = Math.floor(Math.random() * 4);
        this.retraso= 50;
        this.fotograma = 0;
        this.contador =0;
    }
    

    dibuja = ()=>{
        contexto.drawImage(tileMap,0,32,32,32,anchoF*this.x,altoF*this.y,anchoF,altoF);
    }



    compruebaColision =(x,y)=> escenario[x][y]===0;

    
    mueve =()=>{
        protagonista.colisionEnemigo(this.x,this.y);
        if(this.contador < this.retraso){
            this.contador++;
        }else{
            this.contador=0;
            //movimiento hacia arriba
            if(this.direccion ===0){
                if(this.compruebaColision(this.x,this.y-1)===false){
                    this.y--;
                }else{
                    this.direccion = Math.floor(Math.random()*4);
                }
            }
            //movimiento hacia abajo
            if(this.direccion ===1){
                if(this.compruebaColision(this.x,this.y+1)===false){
                    this.y++;
                }else{
                    this.direccion = Math.floor(Math.random()*4);
                }
            }
            //movimiento hacia la izquierda
            if(this.direccion ===2){
                if(this.compruebaColision(this.x-1,this.y)===false){
                    this.x--;
                }else{
                    this.direccion = Math.floor(Math.random()*4);
                }
            }
            //movimiento hacia la derecha
            if(this.direccion ===3){
                if(this.compruebaColision(this.x+1,this.y)===false){
                    this.x++;
                }else{
                    this.direccion = Math.floor(Math.random()*4);
                }
            }

        }
    }


}

// OBJETO JUGADOR
class Jugador{
    
    
    constructor(){
        this.x =1;
        this.y = 1;
        this.color = 'red';
        this.llave = false;
    }

    margenes = (x,y)=>escenario[x][y]===0;

    dibuja = ()=>{

        contexto.drawImage(tileMap,32,32,32,32,anchoF*this.x,altoF*this.y,anchoF,altoF);



        // contexto.fillStyle = this.color;
        // contexto.fillRect(this.x * anchoF, this.y * altoF, anchoF, altoF)
    }
    colisionEnemigo =(x,y)=>{
        if(this.x === x && this.y ===y){
            console.log('has muerto')
            this.muerte()
        }
    }

    arriba = ()=>{
        if(!this.margenes(this.x,this.y-1)){
            this.y--;
            this.logicaObjetos();
        }
    }
    abajo = ()=>{
        if(!this.margenes(this.x,this.y+1)){
            this.y++;
            this.logicaObjetos();
        }
    }
    izquierda = ()=>{
        if(!this.margenes(this.x-1,this.y)){
            this.x--;
            this.logicaObjetos();
        }
    }
    derecha = ()=>{
        if(!this.margenes(this.x+1,this.y)){
            this.x++;
            this.logicaObjetos();
        }
    }

    victoria = ()=>{
        console.log('has ganado la partida');
        const posiciones = posicionesRandom();
        const randomIndices = posiciones[Math.floor(Math.random()*(0+53))];
        this.x =1 ;
        this.y =1;
        this.xllave=parseInt(randomIndices[0]);
        this.yllave=parseInt(randomIndices[1]);
        this.llave = false;
        escenario[this.x][this.y]= 2;
        escenario[this.xllave][this.yllave]=3;
    }
    muerte = ()=>{
        console.log('has muerto');
        this.x =1 ;
        this.y =1;
        this.llave = false;
        escenario[this.x][this.y]= 2;
        escenario[8][3]=3;
    }

    logicaObjetos=()=>{
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
    // cargar imagen
    tileMap = new Image();
    tileMap.src = './image/tilemap.png'   
    
    //creacion de los enemigos
    enemigo.push(new Villano(3,3));
    enemigo.push(new Villano(7,5));
    enemigo.push(new Villano(7,7));
    // creacion del jugador
    protagonista = new Jugador();

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

    for(let i=0; i< enemigo.length; i++){
        enemigo[i].mueve();
        enemigo[i].dibuja();
    }
}

