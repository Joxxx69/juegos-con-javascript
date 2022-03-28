let miCanvas;

// se tiene que utilizar onload para que no se produzca un error 
// al momento de detectar el canvas--se utiliza la funcion inicializar

const inicializar = () => { 
    miCanvas = document.getElementById('canvas');
    miCanvas.addEventListener('mousedown',clicRaton, false);
    miCanvas.addEventListener('mouseup',sueltaRaton, false);
    miCanvas.addEventListener('mousemove',posicionRaton,false)
}

const posicionRaton = (e) => {
    let x= e.pageX;
    let y = e.pageY;
    console.log(`x: ${x} ------ y: ${y}`)
}

const sueltaRaton = (e) => { 
    console.log('el raton se ha liberado')
 }

const clicRaton = (e) => { 
    console.log('has pulsado el boton')
 }
