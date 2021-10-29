const ModalContainer: HTMLDivElement = document.querySelector(
  '.container-modal-instrucciones'
)
const $reiniciar =  document.querySelector("#reiniciar")
const $iniciar =  document.querySelector("#iniciar")
const $detener =  document.querySelector("#detener")

class ModalControles {
  boton: HTMLButtonElement
  container: HTMLDivElement
  constructor (container: HTMLDivElement) {
    this.container = container
    this.container.innerHTML = this.modal1()
    this.addListenerMod1()
  }
  addListenerMod1 () {
    this.boton = document.querySelector('#modal1')
    this.boton.addEventListener('click', () => {
      console.log('Click')
      this.container.innerHTML = this.modal2()
      this.addListenerMod2()
    })
  }
  addListenerMod2 () {
    this.boton = document.querySelector('#modal1')

    this.boton.addEventListener('click', () => {
      console.log('Click')
      this.container.parentNode.removeChild(this.container)
    })
  }

  modal1 () {
    return `
   <div class="instrucciones shadow-xl">
        <div class="flex justify-center text-xl font-bold h-1/6">
          <h3>Juego de la culebra</h3>
        </div>
        <div class="controles teclas h-4/6">
          <img
                     class="w-64 "

            src="https://media.istockphoto.com/vectors/computer-gamer-keyboard-wasd-keys-vector-illustration-wasd-keys-game-vector-id1193231012?k=20&m=1193231012&s=170667a&w=0&h=_9sYY7kbskV1Cdxido1BphuJRDELyHuqhStVkJwb8CM="
            alt=""
          />
          <div class="teclas">
            <h3>Utilize los las teclas wasd para moverse por el mapa</h3>
          </div>
        </div>
        <div class="flex h-1/6 justify-center items-center">
          <button id="modal1" class="button h-10 bg-gray-100">Entendido</button>
        </div>
      </div>
 `
  }
  modal2 () {
    return `
   <div class="instrucciones shadow-xl ">
        <div class="flex justify-center text-xl font-bold h-1/6">
          <h3>Juego de la culebra</h3>
        </div>
        <div class="controles  teclas flex justify-around flex-1 h-4/6">
          <img
           class="w-64 "
            src="https://media.istockphoto.com/vectors/cartoon-black-and-white-illustration-of-snake-vector-id945874222"
            alt=""
          />
          <div class="teclas ">
            <h3>El objetivo del juego es comer la mayor cantidad de ratones con la culebra.</h3>
          </div>
        </div>
        <div class="flex justify-center items-center flex-1  h-1/6">
          <button id="modal1" class="button h-10 bg-gray-100">Entendido</button>
        </div>
      </div>
 `
  }
}
const App = () => {
   try {
    const lienzo: HTMLCanvasElement = document.querySelector('#canvas')
    const tablero: HTMLDivElement = document.querySelector('#contador')
    const context: CanvasRenderingContext2D = lienzo.getContext('2d')
    context.fillStyle = '#000'
    const juego = new Juego(lienzo, tablero)
    
    $iniciar.addEventListener('click',()=>{
      juego.iniciar()
    })
    $detener.addEventListener('click',()=>{
      juego.detener()
    })
    $reiniciar.addEventListener('click',()=>{
      juego.reiniciar()
    })
    
  } catch (error) {
    alert(error.message)
  }

  const modal = new ModalControles(ModalContainer)

}
App()
