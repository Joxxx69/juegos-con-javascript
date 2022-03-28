let fps = 10;
let xEscenario =0;

const mueveEscenario = () => {
     xEscenario++; 
     console.log(xEscenario);
    
}

const atacar = () => {
    console.log('has a tacado');
};


const principal = () => {
    console.log('fotograma')
    mueveEscenario();
}


// setInterval(principal, 1000/fps);




