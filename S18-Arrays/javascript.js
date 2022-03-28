const inicializa =()=>console.log('inicio');

const mochila = ['a','b','c','d'];



const vender = (item) => {
    mochila.splice(2,1)
}

const inventario = () => { 
    mochila.forEach((item, idx) => console.log(`${idx}- ${item}`));
 }



