const ModalContainer = document.querySelector('.container-modal-instrucciones');
const $buttonShowInfo = document.querySelector("#button-show-info");
const $reiniciar = document.querySelector("#reiniciar");
const $modalRestart = document.querySelector("#modal_restart");
const $iniciar = document.querySelector("#iniciar");
class ModalControles {
    constructor(container) {
        this.container = container;
        this.container.innerHTML = this.modal1();
        this.addListenerMod1();
        $buttonShowInfo.addEventListener('click', () => {
            this.container.classList.remove("hidden");
            this.container.innerHTML = this.modal1();
            this.addListenerMod1();
        });
    }
    addListenerMod1() {
        this.boton = document.querySelector('#modal1');
        this.boton.addEventListener('click', () => {
            console.log('Click');
            this.container.innerHTML = this.modal2();
            this.addListenerMod2();
        });
    }
    addListenerMod2() {
        this.boton = document.querySelector('#modal1');
        this.boton.addEventListener('click', () => {
            console.log('Click');
            this.container.classList.add("hidden");
        });
    }
    modal1() {
        return `
   <div class="instrucciones shadow-xl fade-in">
        <div class="flex justify-center text-xl font-bold h-1/6">
          <h3>Juego de la culebra</h3>
        </div>
        <div class="controles teclas h-4/6">
          <img
                     class="w-64 "

            src="./images/wasd.jpg"
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
 `;
    }
    modal2() {
        return `
   <div class="instrucciones shadow-xl fade-in ">
        <div class="flex justify-center text-xl font-bold h-1/6">
          <h3>Juego de la culebra</h3>
        </div>
        <div class="controles  teclas flex justify-around flex-1 h-4/6">
          <img
           class="w-64 "
            src="./images/culebra.jpg"
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
 `;
    }
}
const App = () => {
    try {
        const lienzo = document.querySelector('#canvas');
        const tablero = document.querySelector('#contador');
        const context = lienzo.getContext('2d');
        context.fillStyle = '#406343';
        const juego = new Juego(lienzo, tablero);
        $iniciar.addEventListener('click', () => {
            juego.iniciar();
            $reiniciar.classList.toggle("hidden");
            $iniciar.classList.toggle("hidden");
        });
        $reiniciar.addEventListener('click', () => {
            $modalRestart.classList.add("hidden");
            juego.reiniciar();
        });
    }
    catch (error) {
        alert(error.message);
    }
    const modal = new ModalControles(ModalContainer);
};
App();
