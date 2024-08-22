'use strict';

const closeCarrito = document.querySelector('.carrito__head svg');
const carritoResumen$2 = document.querySelector('.carrito');

closeCarrito.addEventListener('click', (eve)=>{
    carritoResumen$2.classList.remove('display-active-carrito');
});

const containerTabsBtn=document.querySelector('.information__tabs');
const boxInformation=document.querySelectorAll('.information__box');
const btnInformation=document.querySelectorAll('.information__btn');


const manageTab=(tabDataset)=>{
    for (let i = 0; i < boxInformation.length; i++) {
        if (boxInformation[i].id == tabDataset) {
            btnInformation[i].classList.add('informationbtn--active');
            boxInformation[i].classList.add('informationbox--active');
        } else {
            btnInformation[i].classList.remove('informationbtn--active');
            boxInformation[i].classList.remove('informationbox--active');
        }
    }
};


const getTab=(eve)=>{
    if (eve.target && eve.target.closest('button')) {
        const tab=eve.target.closest('button').dataset.section;
        manageTab(tab);
    }
};


containerTabsBtn.addEventListener('click', getTab);

var dataSet = {
	productos: [
		{
			id: '1',
			nombre: 'Tennis Converse Standard xxxx',
			descripcion: 'Consectetur adipisicing elit.',
			precio: 500.0,
			colores: ['negro', 'rojo', 'amarillo'],
			tamaños: ['1,5', '2', '2,5'],
		},

	],
};

const coloresHexagesimal = {
    negro: '#000',
    amarillo: '#FFFF00',
    rojo: '#FF0000',
    azul: '#0000FF'
};

const {productos: productos$1} = dataSet;

const advisorNoProducto=document.querySelector('.no--productos');
const conntainerProductos=document.querySelector('.producto');
const productoBase=document.querySelector('.producto__container');





if (productos$1.length>0) {
    conntainerProductos.style.display='block';
    for (let n = 1; n < productos$1.length; n++) {
        const plantilla=productoBase.cloneNode(true);
        conntainerProductos.appendChild(plantilla);
    }
    const productoCollection=document.querySelectorAll('.producto__container');
    const containerColor=document.querySelectorAll('.producto__contcolor');
    const containerSize=document.querySelectorAll('.producto__contsize');
    for (let c = 0; c < productoCollection.length; c++) {
        productoCollection[c].dataset.idProducto=productos$1[c].id;
        productoCollection[c].querySelector('.producto__name').textContent=productos$1[c].nombre;
        productoCollection[c].querySelector('.producto__description').textContent=productos$1[c].descripcion;
        productoCollection[c].querySelector('.producto__prize').textContent=`$ ${productos$1[c].precio}`;
        productoCollection[c].querySelectorAll('.producto__increase').forEach(increase => {
            increase.dataset.btnIncreaseProducto=productos$1[c].id;
        });
        productoCollection[c].querySelectorAll('.producto__decrease').forEach(decrease=> {
            decrease.dataset.btnDecreaseProducto=productos$1[c].id;
        });
        productoCollection[c].querySelectorAll('.producto__quantity').forEach(quantity => {
            quantity.dataset.cantidadProducto=productos$1[c].id;
        });
        productoCollection[c].querySelectorAll('.producto__btn-carrito').forEach(btnCar => {
            btnCar.dataset.btnCarritoProducto=productos$1[c].id;
        });
        productos$1[c].colores.forEach(color => {
            const plantillaColor=`
                <div class="producto__color selection ">
                    <input
                        style="background-color: ${coloresHexagesimal[color]}"
                        type="radio"
                        data-color="${color}"
                        data-btn-color-producto="${productos$1[c].id}"
                        name="color-negro"
                        value="negro"/>
                    <label style="text-transform:capitalize" for="color-${color}">${color}</label>
                </div>`;   
            containerColor[c].innerHTML+=plantillaColor;
        });
        
        productos$1[c].tamaños.forEach(size => {
            const plantillaSize=`
                <div class="producto__size selection">
                    <input
                        type="radio"
                        data-btn-size-producto="${productos$1[c].id}"
                        data-size="${size}"
                        class="producto__radio-input"
                        value="${size}"/>
                    <label for="${size}">${size}</label>
                </div>`;
            containerSize[c].innerHTML+=plantillaSize;
        });
        containerColor[c].querySelector('.producto__color').classList.add('selection--active');
        containerSize[c].querySelector('.producto__size').classList.add('selection--active');
    }    
    console.log(containerColor[0].querySelector('.producto__color'));
} else {
    conntainerProductos.style.display='none';
    advisorNoProducto.style.display='block';
}

const containerColor=document.querySelectorAll('.producto__contcolor');
const containerSize=document.querySelectorAll('.producto__contsize');
const containerIncrease=document.querySelectorAll('.producto__increase');
const containerDecrease=document.querySelectorAll('.producto__decrease');




const getColor = (eve) => {
    if (eve.target.closest('.producto__color')) {

        const idProducto=eve.target.closest('.producto__color').querySelector('input').dataset.btnColorProducto;

        const selections=document.querySelector(`[data-id-producto="${idProducto}"]`).querySelectorAll('.producto__color');
        const color=eve.target.closest('.producto__color').querySelector('input').dataset.color;
        selections.forEach(select => {
            if (select.querySelector('input').dataset.color == color) {
                select.classList.add('selection--active');
            } else {
                select.classList.remove('selection--active');
            }
        });

        const contexto=document.querySelector(`[data-id-producto="${idProducto}"]`);
        contexto.querySelector('.producto__photo-main img').src=`./img/tennis/${color}.jpg`;

        return {idProducto, color} 
    } 

};

const getSize = (eve) => {
    if (eve.target.closest('.producto__size')) {
        const idProducto=eve.target.closest('.producto__size').querySelector('input').dataset.btnSizeProducto;
        const selections=document.querySelector(`[data-id-producto="${idProducto}"]`).querySelectorAll('.producto__size');
        const size=eve.target.closest('.producto__size').querySelector('input').dataset.size;
        selections.forEach(select => {
            if (select.querySelector('input').dataset.size == size) {
                select.classList.add('selection--active');
            } else {
                select.classList.remove('selection--active');
            }
        });
    } 
};

const bntIncrease = (eve) => {
    const quantityElement=eve.target.previousElementSibling;
    let count=parseInt(quantityElement.textContent);
    count++;
    quantityElement.textContent=count;
};

const bntDecrease = (eve) => {
    const quantityElement=eve.target.nextElementSibling;
    let count=parseInt(quantityElement.textContent);
    if (count!=0) {
        count--;
        quantityElement.textContent=count;
    }
};



containerColor.forEach(color => {
    color.addEventListener('click', getColor);
});

containerSize.forEach(size => {
    size.addEventListener('click', getSize);
});

containerIncrease.forEach(increase => {
    increase.addEventListener('click', bntIncrease);
});

containerDecrease.forEach(decrease => {
    decrease.addEventListener('click', bntDecrease);
});

const {productos} = dataSet;
const btnAgregarCarrito = document.querySelectorAll('.producto__btn-carrito');
const carritoResumen$1 = document.querySelector('.carrito');
const collectionQuantity = document.querySelectorAll('.producto__quantity');
const collectionColor = document.querySelectorAll('.producto__color');
const collectionSize = document.querySelectorAll('.producto__size');



let allDates = [];

function agregarAlCarrito(eve) {
    carritoResumen$1.classList.toggle('display-active-carrito');
    const idProd = parseInt(eve.target.closest('.producto__container').dataset.idProducto);
    let colorProd = '';
    let sizeProd = '';
    let nameProd = productos[idProd-1].nombre;
    let precioProd = productos[idProd-1].precio;
    let cantidadProd = parseInt(collectionQuantity[idProd-1].textContent);
    collectionColor.forEach(c => {
        if (c.querySelector('input').dataset.btnColorProducto == idProd && c.classList.contains('selection--active')) {
            colorProd = c.querySelector('input').dataset.color;
        }
    });
    collectionSize.forEach(size => {
        if (size.querySelector('input').dataset.btnSizeProducto == idProd && size.classList.contains('selection--active')) {
            sizeProd = size.querySelector('input').dataset.size;
        }
    });

    let found = false;
    if (cantidadProd !== 0) {
        for (let index = 0; index < allDates.length; index++) {
            if (allDates[index].idProducto == idProd &&
                allDates[index].nombre == nameProd && 
                allDates[index].precio == precioProd && 
                allDates[index].color == colorProd && 
                allDates[index].size == sizeProd) {
                allDates[index].cantidad += cantidadProd;
                found = true;
                break;
            }
        }
        
    
        if (!found) {
            allDates.push({
                idProducto: idProd,
                nombre: nameProd,
                precio: precioProd,
                color: colorProd,
                size: sizeProd,
                cantidad: cantidadProd,
            });
        }
    }

    // Emitir evento personalizado
    const event = new CustomEvent('carritoActualizado', {
        detail: {
            allDates: getAllDates()
        }
    });
    document.dispatchEvent(event);
    
    console.log(allDates);
}


btnAgregarCarrito.forEach(btn => {
    btn.addEventListener('click', agregarAlCarrito);
});

function getAllDates() {
    return allDates;
}

const containreSmallGallery=document.querySelectorAll('.producto__gallery');

containreSmallGallery.forEach(photo => {
    photo.addEventListener('click', (eve)=>{
        if (eve.target.closest('.producto__figure--gallery')) {
            const idProducto=eve.target.closest('.producto__container').dataset.idProducto;
            const producto=document.querySelector(`[data-id-producto="${idProducto}"]`);
            const pathImg=eve.target.closest('.producto__img--gallery').src;
            producto.querySelector('.producto__photo-main img').src=pathImg;
        }
    });
});

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

function updateTrashes(allDates) {
    if (allDates.length > 0) {
        const allTrashes = document.querySelectorAll('[data-id-trash]'); // Asegúrate de usar la clase correcta
        allTrashes.forEach(trashIcon => {
            trashIcon.addEventListener('click', () => {
                const index = parseInt(trashIcon.getAttribute('data-id-trash')) - 1;
                allDates.splice(index, 1); // Elimina el producto del array
                // Emitir evento personalizado para actualizar el carrito
                const event = new CustomEvent('carritoActualizado', {
                    detail: { allDates }
                });
                document.dispatchEvent(event);
            });
        });
    }
}

// Escuchar el evento personalizado
document.addEventListener('carritoActualizado', (eve) => {
    const allDates = eve.detail.allDates;
    updateTrashes(allDates);
});

updateTrashes(getAllDates());

const itemCarrito=document.querySelector('.hero__item--carrito');
const carritoResumen = document.querySelector('.carrito');

itemCarrito.addEventListener('click', (eve)=>{
    eve.preventDefault();
    carritoResumen.classList.toggle('display-active-carrito');
});
