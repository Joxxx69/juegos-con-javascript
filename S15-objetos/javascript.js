const personaje = function (x, y, nombre) {
    this.x = x;
    this.y = y;
    this.nombre = nombre;

    // metodo para moverse abajo
    this.abajo = function () {
        this.y += 10;
    };

    this.hablar = function () { 
        console.log(`hola jugador, me llamo ${this.nombre}`)
    };
};

const personaje2 = new personaje(200, 300, "Karla");

personaje2.abajo();
