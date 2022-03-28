// document.addEventListener('keydown', (tecla)=>{
//     // console.log(tecla.code)
//     switch (tecla.code) {
//         case 'Space':
//             console.log('Espacio-1');
//             break;
//         case 'ArrowUp':
//             console.log('ArrowUp-1')
//             break;
//         default:
//             break;
//     }
// });




let configTeclado = {prevent_repeat: true};
let eventoTeclado = new window.keypress.Listener(this,configTeclado);


const pulsaA = () => { console.log('has pulsado la a') }

const pulsaAB = () => { console.log('has pulsado la a y la b') }

const ataqueEspecial = () => { console.log('ATAQUE ESPECIAL !!!!!') }

eventoTeclado.simple_combo('a',pulsaA)  
eventoTeclado.simple_combo('b a',pulsaAB)
eventoTeclado.simple_combo('up down a b',ataqueEspecial)




