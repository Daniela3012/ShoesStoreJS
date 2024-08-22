import dataSet from '../data/productos';
const {productos} = dataSet;
const btnAgregarCarrito = document.querySelectorAll('.producto__btn-carrito');
const carritoResumen = document.querySelector('.carrito');
const collectionQuantity = document.querySelectorAll('.producto__quantity');
const collectionColor = document.querySelectorAll('.producto__color');
const collectionSize = document.querySelectorAll('.producto__size');



let allDates = [];

function agregarAlCarrito(eve) {
    carritoResumen.classList.toggle('display-active-carrito');
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

export function getAllDates() {
    return allDates;
}
