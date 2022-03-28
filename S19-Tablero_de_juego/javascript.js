let canvas;
let contexto;
let fps=50;

let anchoF = 45;
let altoF = 30;

let cesped = 'lightgreen';
let agua = 'blue';
let tierra = 'brown';


let protagonista;

let escenario =[
    [0,1,0,2,2],
    [0,1,1,2,0],
    [0,0,1,2,1],
    [0,2,2,2,1],
    [2,2,2,0,1]
];

let escenario2 =[
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,2,2,2,2,2,0,0,0],
    [0,0,2,0,0,0,2,2,0,0],
    [0,0,2,2,2,0,0,2,0,0],
    [0,2,2,0,0,0,0,2,0,0],
    [0,0,2,0,0,0,2,2,2,0],
    [0,2,2,2,0,0,2,0,0,0],
    [0,2,2,2,0,0,2,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
];


const dibujaEscenario = () => {
    let color;
    for (let x = 0; x < escenario2.length; x++) {
        for (let y = 0; y < escenario2[x].length; y++) {
            if(escenario2[x][y]===0){
                color= cesped;
            }           
            if(escenario2[x][y]===1){
                color= agua;
            }           
            if(escenario2[x][y]===2){
                color = tierra;
            }   
            contexto.fillStyle =color;      
            contexto.fillRect(x*anchoF, y* altoF, anchoF, altoF )  
        }    
    }
    // console.log('-------------------------')
    // escenario.forEach((x,i)=>{
    //     x.forEach((y,j)=>{
    //         console.log(y)
    //     })
    // })
}

// OBJETO JUGADOR
const jugador = function(){
    
    this.x =1;
    this.y = 1;
    this.color = 'red';


    this.margenes = (x,y)=>escenario2[x][y]===0;

    this.dibuja = ()=>{
        contexto.fillStyle = this.color;
        contexto.fillRect(this.x * anchoF, this.y * altoF, anchoF, altoF)
    }

    this.arriba = ()=>{
        !this.margenes(this.x,this.y-1)? this.y--:this.y;
    }
    this.abajo = ()=>{
        !this.margenes(this.x,this.y+1)? this.y++: this.y;
    }
    this.izquierda = ()=>{
        !this.margenes(this.x-1,this.y)? this.x--:this.x;
    }
    this.derecha = ()=>{
        !this.margenes(this.x+1,this.y)? this.x++: this.x;
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

