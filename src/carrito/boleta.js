import { getAllDates } from "./agregarCarrito";

const containerCarrito = document.querySelector('.carrito__contproducts');
const totalCompleto=document.querySelector('.carrito__total-num');

function renderCarrito(allDates) {
  
    containerCarrito.innerHTML = ''; // Limpiar el contenedor antes de renderizar
    let pagoTotal=0;
    if (allDates.length === 0) {
        containerCarrito.textContent = 'No hay productos seleccionados';
        totalCompleto.textContent='$ 0';
    } else {
      let h=0;
        allDates.forEach(prod => {
          h++;
          pagoTotal=pagoTotal+prod.precio*prod.cantidad;
            const sectionCarrito = document.createElement('section');
            sectionCarrito.classList.add('carrito__product');
            sectionCarrito.innerHTML = `
                <figure class="carrito__figure">
                  <img src="./img/thumbs/${prod.color}.jpg" alt="" class="carrito__img" />
                </figure>
                <div class="carrito__proddescription">
                  <span class="carrito__quanitity">${prod.cantidad}</span><span> x </span>
                  <span class="carrito__prodname">${prod.nombre}.</span>
                  <br /><br />
                  <span class="carrito__label">Tamaño: </span>
                  <span class="carrito__size">${prod.size}</span>
                  <span style="margin-left:15px;" class="carrito__label">Color: </span>
                  <span class="carrito__color" style="text-transform:capitalize">${prod.color}</span>
                </div>
                <div class="carrito__conttotalprod">
                  <svg
                  data-id-trash="${h}"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    height="25"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  <span class="carrito__totalprizeprod">$${prod.precio*prod.cantidad}</span>
                </div>`;
            containerCarrito.appendChild(sectionCarrito);
        });
        totalCompleto.textContent = allDates.length === 0 ? '0' : `$ ${pagoTotal}`;
    }
    
    if (pagoTotal==0) {
      containerCarrito.textContent = 'No hay productos seleccionados';
    }
    
}

// Escuchar el evento personalizado
document.addEventListener('carritoActualizado', (e) => {
    const allDates = e.detail.allDates;
    renderCarrito(allDates);
});

// Llama a la función para renderizar el carrito inicialmente
renderCarrito(getAllDates());
