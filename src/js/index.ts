enum Direcciones {
  arriba = 'ARRIBA',
  abajo = 'ABAJO',
  derecha = 'DERECHA',
  izquierda = 'IZQUERDA'
}
const imagenTierra = "https://c.pxhere.com/photos/43/5a/concrete_gray_background_texture_concrete_wall_wall-1063450.jpg!d"



class ObjetoDibujable {
  ancho: number
  alto: number
  posicionXi: number
  posicionYi: number

  constructor () {
    this.ancho = 10
    this.alto = 10
    this.posicionXi = 100
    this.posicionYi = 100
  }
  setPosicion (posicionX: number, posicionY: number) {
    this.posicionXi = posicionX
    this.posicionYi = posicionY
  }
  setTamano (alto: number, ancho: number) {
    this.ancho = ancho
    this.alto = alto
  }
  setPosicionY (posicionY: number) {
    this.posicionYi = posicionY
  }
  setPosicionX (posicionX: number) {
    this.posicionXi = posicionX
  }
}

class EslabonCulebra extends ObjetoDibujable {
  color = '#000'
  direccion: Direcciones = Direcciones.abajo
  numero: number = 0
  constructor (direccion: Direcciones, numero: number, color: string = '#000') {
    super()
    this.color = color
    this.direccion = direccion
    this.numero = numero
  }
  setDireccion (direccion: Direcciones) {
    this.direccion = direccion
  }
}

class Raton extends ObjetoDibujable {
  mapa: Mapa
  constructor (mapa: Mapa, color: string = '#000') {
    super()
    this.mapa = mapa
  }
  saltar () {
    const nuevoX = Juego.random(0, this.mapa.ancho)
    const nuevoY = Juego.random(0, this.mapa.ancho - this.alto)
    this.posicionXi = nuevoX - (nuevoX % 50)
    this.posicionYi = nuevoY - (nuevoY % 50)
  }
}

class Culebra {
  direccion = Direcciones.derecha
  color = '#000'
  eslabones: EslabonCulebra[] = [new EslabonCulebra(Direcciones.derecha, 0)]
  ultimoEslabon: EslabonCulebra
  mapa: Mapa
  numero: number = 1

  constructor (mapa: Mapa, color: string = '#000') {
    if (color) {
      this.color = color
    }
    this.ultimoEslabon = this.eslabones[0]
    this.mapa = mapa
  }

  cambiarDireccion = (direccion: Direcciones) => {
    if (
      this.direccion === Direcciones.abajo &&
      direccion !== Direcciones.arriba
    ) {
      this.direccion = direccion
    }
    if (
      this.direccion === Direcciones.arriba &&
      direccion !== Direcciones.abajo
    ) {
      this.direccion = direccion
    }
    if (
      this.direccion === Direcciones.derecha &&
      direccion !== Direcciones.izquierda
    ) {
      this.direccion = direccion
    }
    if (
      this.direccion === Direcciones.izquierda &&
      direccion !== Direcciones.derecha
    ) {
      this.direccion = direccion
    }
  }
  mover = ():{haChocadoConsigoMismo:boolean} => {
    const eslabonesRestantes: EslabonCulebra[] = [...this.eslabones]
    if (this.eslabones.length >= 2) {
      let ultimoEslabonTemp: EslabonCulebra = this.eslabones[1]
      let ultimoEslabonTemp2: EslabonCulebra
      eslabonesRestantes.shift()
      eslabonesRestantes.shift()

      eslabonesRestantes.map(eslabon => {
        if (ultimoEslabonTemp) {
          ultimoEslabonTemp2 = new EslabonCulebra(
            ultimoEslabonTemp.direccion,
            ultimoEslabonTemp.numero
          )
          ultimoEslabonTemp2.setPosicion(
            ultimoEslabonTemp.posicionXi,
            ultimoEslabonTemp.posicionYi
          )
          eslabon.setPosicion(
            ultimoEslabonTemp.posicionXi,
            ultimoEslabonTemp.posicionYi
          )
          eslabon.setDireccion(ultimoEslabonTemp.direccion)
          ultimoEslabonTemp = null
        } else {
          const temp = new EslabonCulebra(eslabon.direccion, eslabon.numero)
          temp.setPosicion(eslabon.posicionXi, eslabon.posicionYi)
          eslabon.setPosicion(
            ultimoEslabonTemp2.posicionXi,
            ultimoEslabonTemp2.posicionYi
          )
          eslabon.setDireccion(ultimoEslabonTemp2.direccion)
          ultimoEslabonTemp2 = temp
        }
      })

      this.eslabones[1].setPosicion(
        this.ultimoEslabon.posicionXi,
        this.ultimoEslabon.posicionYi
      )
      this.eslabones[1].setDireccion(this.ultimoEslabon.direccion)
    }

    if (this.direccion === Direcciones.abajo) {
      const nuevaPosicion =
        this.ultimoEslabon.posicionYi + this.ultimoEslabon.alto
      if (nuevaPosicion < this.mapa.alto + this.ultimoEslabon.alto) {
        this.ultimoEslabon.setPosicionY(nuevaPosicion)
        this.ultimoEslabon.setDireccion(this.direccion)
      }
    }
    if (this.direccion === Direcciones.arriba) {
      const nuevaPosicion =
        this.ultimoEslabon.posicionYi - this.ultimoEslabon.alto
      if (
        nuevaPosicion + this.ultimoEslabon.alto >=
        0 - this.ultimoEslabon.alto
      ) {
        this.ultimoEslabon.setPosicionY(nuevaPosicion)
        this.ultimoEslabon.setDireccion(this.direccion)
      }
    }
    if (this.direccion === Direcciones.derecha) {
      const nuevaPosicion =
        this.ultimoEslabon.posicionXi + this.ultimoEslabon.ancho
      if (nuevaPosicion <= this.mapa.ancho + this.ultimoEslabon.ancho) {
        this.ultimoEslabon.setPosicionX(nuevaPosicion)
        this.ultimoEslabon.setDireccion(this.direccion)
      }
    }
    if (this.direccion === Direcciones.izquierda) {
      const nuevaPosicion =
        this.ultimoEslabon.posicionXi - this.ultimoEslabon.ancho
      if (
        nuevaPosicion + this.ultimoEslabon.ancho >=
        0 - this.ultimoEslabon.ancho
      ) {
        this.ultimoEslabon.setPosicionX(nuevaPosicion)
        this.ultimoEslabon.setDireccion(this.direccion)
      }
    }
    const haChocadoConsigoMismo = eslabonesRestantes.some(eslabon => eslabon.posicionXi===this.ultimoEslabon.posicionXi&&eslabon.posicionYi===this.ultimoEslabon.posicionYi)
    console.log({haChocadoConsigoMismo})
    return { haChocadoConsigoMismo}
  }


  morder = (raton: Raton): boolean => {
    let haMordido = false
    const esMismaX = this.ultimoEslabon.posicionXi === raton.posicionXi
    const esMismaY = this.ultimoEslabon.posicionYi === raton.posicionYi
    if (esMismaX && esMismaY) {
      raton.saltar()
      haMordido = true
      this.mapa.playMordisco()
      this.agregarEslabon()
    }
    return haMordido
  }
  agregarEslabon () {
    const cola = this.eslabones[this.eslabones.length - 1]
    const nuevoEslabon = new EslabonCulebra(cola.direccion, ++this.numero)
    nuevoEslabon.setDireccion(cola.direccion)

    let nueva: number
    if (cola.direccion === Direcciones.abajo) {
      nueva = cola.posicionYi - cola.alto
      nuevoEslabon.setPosicionY(nueva)
    }
    if (cola.direccion === Direcciones.arriba) {
      nueva = cola.posicionYi + cola.alto
      nuevoEslabon.setPosicionY(nueva)
    }
    if (cola.direccion === Direcciones.derecha) {
      nueva = cola.posicionXi - cola.ancho
      nuevoEslabon.setPosicionX(nueva)
    }
    if (cola.direccion === Direcciones.izquierda) {
      nueva = cola.posicionXi + cola.ancho
      nuevoEslabon.setPosicionX(nueva)
    }
    this.eslabones.push(nuevoEslabon)
  }
}

class Mapa {
  ancho: number
  alto: number
  private canvas: HTMLCanvasElement
  contexto: CanvasRenderingContext2D
  private imagenMapa:HTMLImageElement
  private audio:HTMLAudioElement

  constructor (canvas: HTMLCanvasElement) {
    this.ancho = canvas.width
    this.alto = canvas.height
    this.contexto = canvas.getContext('2d')
    this.canvas = canvas
    this.imagenMapa = new Image();   // Create new img element
    this.imagenMapa.src = imagenTierra
    this.imagenMapa.onload = ()=>this.dibujarMapa()
    this.audio = document.getElementById("audio") as HTMLAudioElement
    
  }
  playMordisco(){
    this.audio.play()
  }
  dibujarMapa(){
      this.contexto.drawImage(this.imagenMapa, 0, 0);
  }
  dibujarObjeto (objeto: Culebra | EslabonCulebra | Raton) {
    if (objeto instanceof Culebra) {
      objeto.eslabones.map((eslabon: EslabonCulebra) => {
        this.contexto.fillRect(
          eslabon.posicionXi,
          eslabon.posicionYi,
          eslabon.ancho,
          eslabon.alto
        )
      })
    } else {
      this.contexto.fillRect(
        objeto.posicionXi,
        objeto.posicionYi,
        objeto.ancho,
        objeto.alto
      )
    }
  }
  limpiarMapa () {
    this.contexto.save()
    this.contexto.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.contexto.restore()
  }
}

enum TeclasMovimiento {
  arriba = 'w',
  abajo = 's',
  derecha = 'd',
  izquierda = 'a'
}

class Juego {
  culebra: Culebra
  raton: Raton
  mapa: Mapa
  lienzo: HTMLCanvasElement
  frames: number = 80
  teclas = {}
  interval: number
  puntos: number = 0
  tablero: HTMLDivElement
  constructor (lienzo: HTMLCanvasElement, tablero: HTMLDivElement) {
    this.lienzo =lienzo
    this.mapa = new Mapa(lienzo)
    this.tablero = tablero
    this.culebra = new Culebra(this.mapa)
    this.raton = new Raton(this.mapa)
  }
  agregarListeners = () => {
    document.addEventListener('keypress', this.detectarMovimientoHandler)
  }
  removeListeners = () => {
    document.removeEventListener('keypress', this.detectarMovimientoHandler)
  }
  detectarMovimientoHandler = e => {

    if (e.key.toLowerCase() === TeclasMovimiento.abajo) {
      this.culebra.cambiarDireccion(Direcciones.abajo)
    }
    if (e.key.toLowerCase() === TeclasMovimiento.arriba) {
      this.culebra.cambiarDireccion(Direcciones.arriba)
    }
    if (e.key.toLowerCase() === TeclasMovimiento.derecha) {
      this.culebra.cambiarDireccion(Direcciones.derecha)
    }
    if (e.key.toLowerCase() === TeclasMovimiento.izquierda) {
      this.culebra.cambiarDireccion(Direcciones.izquierda)
    }
    
  }
  validarChoqueConMapa (culebra: Culebra): { haChocado: boolean } {
    let haChocado = false
    if (
      culebra.ultimoEslabon.posicionXi===
      this.mapa.ancho
    ) {
      haChocado = true
    }
    if (culebra.ultimoEslabon.posicionYi +culebra.ultimoEslabon.alto ===0 ) {
      haChocado = true
    }
    if (culebra.ultimoEslabon.posicionYi ===this.mapa.alto) {
      haChocado = true
    }
    if (culebra.ultimoEslabon.posicionXi +culebra.ultimoEslabon.ancho === 0) {
      haChocado = true
    }
    return { haChocado }
  }
  static random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  async iniciar () {
    clearInterval(this.interval)
    this.removeListeners()

    this.agregarListeners()
    await this.renderizar()
    this.detener()
  }
  reiniciar () {
    this.mapa = new Mapa(this.lienzo)
    this.culebra = new Culebra(this.mapa)
    this.raton = new Raton(this.mapa)
    this.iniciar()
    this.frames = 100
    this.puntos = 0
  }
  detener () {
    clearInterval(this.interval)
    this.removeListeners()
  this.mapa.contexto.font = '48px serif';
  this.mapa.contexto.fillStyle = "#fff"
  this.mapa.contexto.fillText('Se acabó el juego', this.mapa.ancho*0.175, this.mapa.alto*0.55)
  
  }
  aumentarPunto = () => {
    ++this.puntos
    if (this.frames - 5 > 30) {
      this.frames -= 5
      this.detener()
      this.iniciar()
    }
    this.tablero.innerHTML = `
    <span class="contador">Puntos: </span>
        <span id="contador" class="contador">${this.puntos}</span>
    `
  }
  renderizar = () => {
    return new Promise((resolve, reject) => {
      try {
        this.interval = setInterval(() => {
          const mordio: boolean = this.culebra.morder(this.raton)
          this.mapa.dibujarMapa()
          this.mapa.dibujarObjeto(this.culebra)
          this.mapa.dibujarObjeto(this.raton)
          this.mapa.limpiarMapa()

          if (mordio) {
            this.aumentarPunto()
          }
           const {haChocadoConsigoMismo}= this.culebra.mover()
          const { haChocado } = this.validarChoqueConMapa(this.culebra)
          if (haChocado||haChocadoConsigoMismo) {
            resolve(true)
          }
          this.mapa.dibujarMapa()
          this.mapa.dibujarObjeto(this.culebra)
          this.mapa.dibujarObjeto(this.raton)

        }, this.frames)
      } catch (error) {
        reject('Error' + error.message)
      }
    })
  }
}
