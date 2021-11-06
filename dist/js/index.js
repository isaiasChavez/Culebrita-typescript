var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Direcciones;
(function (Direcciones) {
    Direcciones["arriba"] = "ARRIBA";
    Direcciones["abajo"] = "ABAJO";
    Direcciones["derecha"] = "DERECHA";
    Direcciones["izquierda"] = "IZQUERDA";
})(Direcciones || (Direcciones = {}));
const imagenTierra = "../images/verde.jpg";
class ObjetoDibujable {
    constructor() {
        this.ancho = 10;
        this.alto = 10;
        this.posicionXi = 100;
        this.posicionYi = 100;
    }
    setPosicion(posicionX, posicionY) {
        this.posicionXi = posicionX;
        this.posicionYi = posicionY;
    }
    setTamano(alto, ancho) {
        this.ancho = ancho;
        this.alto = alto;
    }
    setPosicionY(posicionY) {
        this.posicionYi = posicionY;
    }
    setPosicionX(posicionX) {
        this.posicionXi = posicionX;
    }
}
class EslabonCulebra extends ObjetoDibujable {
    constructor(direccion, numero, color = '#000') {
        super();
        this.color = '#000';
        this.direccion = Direcciones.abajo;
        this.numero = 0;
        this.color = color;
        this.direccion = direccion;
        this.numero = numero;
    }
    setDireccion(direccion) {
        this.direccion = direccion;
    }
}
class Raton extends ObjetoDibujable {
    constructor(mapa, color = '#000') {
        super();
        this.mapa = mapa;
    }
    saltar() {
        const nuevoX = Juego.random(0, this.mapa.ancho);
        const nuevoY = Juego.random(0, this.mapa.alto);
        this.posicionXi = nuevoX - (nuevoX % 50);
        this.posicionYi = nuevoY - (nuevoY % 50);
    }
}
class Culebra {
    constructor(mapa, color = '#000') {
        this.direccion = Direcciones.derecha;
        this.color = '#000';
        this.eslabones = [new EslabonCulebra(Direcciones.derecha, 0)];
        this.numero = 1;
        this.cambiarDireccion = (direccion) => {
            if (this.direccion === Direcciones.abajo &&
                direccion !== Direcciones.arriba) {
                this.direccion = direccion;
            }
            if (this.direccion === Direcciones.arriba &&
                direccion !== Direcciones.abajo) {
                this.direccion = direccion;
            }
            if (this.direccion === Direcciones.derecha &&
                direccion !== Direcciones.izquierda) {
                this.direccion = direccion;
            }
            if (this.direccion === Direcciones.izquierda &&
                direccion !== Direcciones.derecha) {
                this.direccion = direccion;
            }
        };
        this.mover = () => {
            const eslabonesRestantes = [...this.eslabones];
            if (this.eslabones.length >= 2) {
                let ultimoEslabonTemp = this.eslabones[1];
                let ultimoEslabonTemp2;
                eslabonesRestantes.shift();
                eslabonesRestantes.shift();
                eslabonesRestantes.map(eslabon => {
                    if (ultimoEslabonTemp) {
                        ultimoEslabonTemp2 = new EslabonCulebra(ultimoEslabonTemp.direccion, ultimoEslabonTemp.numero);
                        ultimoEslabonTemp2.setPosicion(ultimoEslabonTemp.posicionXi, ultimoEslabonTemp.posicionYi);
                        eslabon.setPosicion(ultimoEslabonTemp.posicionXi, ultimoEslabonTemp.posicionYi);
                        eslabon.setDireccion(ultimoEslabonTemp.direccion);
                        ultimoEslabonTemp = null;
                    }
                    else {
                        const temp = new EslabonCulebra(eslabon.direccion, eslabon.numero);
                        temp.setPosicion(eslabon.posicionXi, eslabon.posicionYi);
                        eslabon.setPosicion(ultimoEslabonTemp2.posicionXi, ultimoEslabonTemp2.posicionYi);
                        eslabon.setDireccion(ultimoEslabonTemp2.direccion);
                        ultimoEslabonTemp2 = temp;
                    }
                });
                this.eslabones[1].setPosicion(this.ultimoEslabon.posicionXi, this.ultimoEslabon.posicionYi);
                this.eslabones[1].setDireccion(this.ultimoEslabon.direccion);
            }
            if (this.direccion === Direcciones.abajo) {
                const nuevaPosicion = this.ultimoEslabon.posicionYi + this.ultimoEslabon.alto;
                if (nuevaPosicion < this.mapa.alto + this.ultimoEslabon.alto) {
                    this.ultimoEslabon.setPosicionY(nuevaPosicion);
                    this.ultimoEslabon.setDireccion(this.direccion);
                }
            }
            if (this.direccion === Direcciones.arriba) {
                const nuevaPosicion = this.ultimoEslabon.posicionYi - this.ultimoEslabon.alto;
                if (nuevaPosicion + this.ultimoEslabon.alto >=
                    0 - this.ultimoEslabon.alto) {
                    this.ultimoEslabon.setPosicionY(nuevaPosicion);
                    this.ultimoEslabon.setDireccion(this.direccion);
                }
            }
            if (this.direccion === Direcciones.derecha) {
                const nuevaPosicion = this.ultimoEslabon.posicionXi + this.ultimoEslabon.ancho;
                if (nuevaPosicion <= this.mapa.ancho + this.ultimoEslabon.ancho) {
                    this.ultimoEslabon.setPosicionX(nuevaPosicion);
                    this.ultimoEslabon.setDireccion(this.direccion);
                }
            }
            if (this.direccion === Direcciones.izquierda) {
                const nuevaPosicion = this.ultimoEslabon.posicionXi - this.ultimoEslabon.ancho;
                if (nuevaPosicion + this.ultimoEslabon.ancho >=
                    0 - this.ultimoEslabon.ancho) {
                    this.ultimoEslabon.setPosicionX(nuevaPosicion);
                    this.ultimoEslabon.setDireccion(this.direccion);
                }
            }
            const haChocadoConsigoMismo = eslabonesRestantes.some(eslabon => eslabon.posicionXi === this.ultimoEslabon.posicionXi && eslabon.posicionYi === this.ultimoEslabon.posicionYi);
            console.log({ haChocadoConsigoMismo });
            return { haChocadoConsigoMismo };
        };
        this.morder = (raton) => {
            let haMordido = false;
            const esMismaX = this.ultimoEslabon.posicionXi === raton.posicionXi;
            const esMismaY = this.ultimoEslabon.posicionYi === raton.posicionYi;
            if (esMismaX && esMismaY) {
                raton.saltar();
                haMordido = true;
                this.mapa.playMordisco();
                this.agregarEslabon();
            }
            return haMordido;
        };
        if (color) {
            this.color = color;
        }
        this.ultimoEslabon = this.eslabones[0];
        this.mapa = mapa;
    }
    agregarEslabon() {
        const cola = this.eslabones[this.eslabones.length - 1];
        const nuevoEslabon = new EslabonCulebra(cola.direccion, ++this.numero);
        nuevoEslabon.setDireccion(cola.direccion);
        let nueva;
        if (cola.direccion === Direcciones.abajo) {
            nueva = cola.posicionYi - cola.alto;
            nuevoEslabon.setPosicionY(nueva);
        }
        if (cola.direccion === Direcciones.arriba) {
            nueva = cola.posicionYi + cola.alto;
            nuevoEslabon.setPosicionY(nueva);
        }
        if (cola.direccion === Direcciones.derecha) {
            nueva = cola.posicionXi - cola.ancho;
            nuevoEslabon.setPosicionX(nueva);
        }
        if (cola.direccion === Direcciones.izquierda) {
            nueva = cola.posicionXi + cola.ancho;
            nuevoEslabon.setPosicionX(nueva);
        }
        this.eslabones.push(nuevoEslabon);
    }
}
class Mapa {
    constructor(canvas) {
        this.ancho = canvas.width;
        this.alto = canvas.height;
        this.contexto = canvas.getContext('2d');
        this.canvas = canvas;
        this.imagenMapa = new Image(); // Create new img element
        this.imagenMapa.src = imagenTierra;
        this.imagenMapa.onload = () => this.dibujarMapa();
        this.audio = document.getElementById("audio");
    }
    playMordisco() {
        this.audio.play();
    }
    dibujarMapa() {
        this.contexto.drawImage(this.imagenMapa, 0, 0);
    }
    dibujarObjeto(objeto) {
        if (objeto instanceof Culebra) {
            objeto.eslabones.map((eslabon) => {
                this.contexto.fillRect(eslabon.posicionXi, eslabon.posicionYi, eslabon.ancho, eslabon.alto);
            });
        }
        else {
            this.contexto.fillRect(objeto.posicionXi, objeto.posicionYi, objeto.ancho, objeto.alto);
        }
    }
    limpiarMapa() {
        this.contexto.save();
        this.contexto.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.contexto.restore();
    }
}
var TeclasMovimiento;
(function (TeclasMovimiento) {
    TeclasMovimiento["arriba"] = "w";
    TeclasMovimiento["abajo"] = "s";
    TeclasMovimiento["derecha"] = "d";
    TeclasMovimiento["izquierda"] = "a";
})(TeclasMovimiento || (TeclasMovimiento = {}));
class Juego {
    constructor(lienzo, tablero) {
        this.frames = 80;
        this.teclas = {};
        this.puntos = 0;
        this.agregarListeners = () => {
            document.addEventListener('keypress', e => {
                if (e.key.toLowerCase() === TeclasMovimiento.abajo) {
                    this.culebra.cambiarDireccion(Direcciones.abajo);
                }
                if (e.key.toLowerCase() === TeclasMovimiento.arriba) {
                    this.culebra.cambiarDireccion(Direcciones.arriba);
                }
                if (e.key.toLowerCase() === TeclasMovimiento.derecha) {
                    this.culebra.cambiarDireccion(Direcciones.derecha);
                }
                if (e.key.toLowerCase() === TeclasMovimiento.izquierda) {
                    this.culebra.cambiarDireccion(Direcciones.izquierda);
                }
            });
        };
        this.removeListeners = () => {
            document.removeEventListener('keypress', this.detectarMovimientoHandler);
        };
        this.detectarMovimientoHandler = e => {
            if (e.key.toLowerCase() === TeclasMovimiento.abajo) {
                this.culebra.cambiarDireccion(Direcciones.abajo);
            }
            if (e.key.toLowerCase() === TeclasMovimiento.arriba) {
                this.culebra.cambiarDireccion(Direcciones.arriba);
            }
            if (e.key.toLowerCase() === TeclasMovimiento.derecha) {
                this.culebra.cambiarDireccion(Direcciones.derecha);
            }
            if (e.key.toLowerCase() === TeclasMovimiento.izquierda) {
                this.culebra.cambiarDireccion(Direcciones.izquierda);
            }
        };
        this.aumentarPunto = () => {
            ++this.puntos;
            if (this.frames - 5 > 30) {
                this.frames -= 5;
                this.detener();
                this.iniciar();
            }
            this.tablero.innerHTML = `
    <span class="contador">Puntos: </span>
        <span id="contador" class="contador">${this.puntos}</span>
    `;
        };
        this.renderizar = () => {
            return new Promise((resolve, reject) => {
                try {
                    this.interval = setInterval(() => {
                        const mordio = this.culebra.morder(this.raton);
                        this.mapa.dibujarMapa();
                        this.mapa.dibujarObjeto(this.culebra);
                        this.mapa.dibujarObjeto(this.raton);
                        this.mapa.limpiarMapa();
                        if (mordio) {
                            this.aumentarPunto();
                        }
                        const { haChocadoConsigoMismo } = this.culebra.mover();
                        const { haChocado } = this.validarChoqueConMapa(this.culebra);
                        if (haChocado || haChocadoConsigoMismo) {
                            resolve(true);
                        }
                        this.mapa.dibujarMapa();
                        this.mapa.dibujarObjeto(this.culebra);
                        this.mapa.dibujarObjeto(this.raton);
                    }, this.frames);
                }
                catch (error) {
                    reject('Error' + error.message);
                }
            });
        };
        this.lienzo = lienzo;
        this.mapa = new Mapa(lienzo);
        this.tablero = tablero;
        this.culebra = new Culebra(this.mapa);
        this.raton = new Raton(this.mapa);
    }
    validarChoqueConMapa(culebra) {
        let haChocado = false;
        if (culebra.ultimoEslabon.posicionXi ===
            this.mapa.ancho) {
            haChocado = true;
        }
        if (culebra.ultimoEslabon.posicionYi + culebra.ultimoEslabon.alto === 0) {
            haChocado = true;
        }
        if (culebra.ultimoEslabon.posicionYi === this.mapa.alto) {
            haChocado = true;
        }
        if (culebra.ultimoEslabon.posicionXi + culebra.ultimoEslabon.ancho === 0) {
            haChocado = true;
        }
        return { haChocado };
    }
    iniciar() {
        return __awaiter(this, void 0, void 0, function* () {
            clearInterval(this.interval);
            this.removeListeners();
            this.agregarListeners();
            yield this.renderizar();
            console.log("Algo");
            $modalRestart.classList.remove("hidden");
            this.detener();
        });
    }
    reiniciar() {
        this.mapa = new Mapa(this.lienzo);
        this.culebra = new Culebra(this.mapa);
        this.raton = new Raton(this.mapa);
        this.iniciar();
        this.frames = 100;
        this.puntos = 0;
    }
    detener() {
        clearInterval(this.interval);
        this.removeListeners();
        this.mapa.contexto.fillStyle = "#fff";
    }
}
Juego.random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
