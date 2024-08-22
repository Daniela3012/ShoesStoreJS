import dataSet from '../data/productos';
import {coloresHexagesimal} from './colorFill';

const {productos} = dataSet;

const advisorNoProducto=document.querySelector('.no--productos');
const conntainerProductos=document.querySelector('.producto');
const productoBase=document.querySelector('.producto__container');





if (productos.length>0) {
    conntainerProductos.style.display='block';
    for (let n = 1; n < productos.length; n++) {
        const plantilla=productoBase.cloneNode(true);
        conntainerProductos.appendChild(plantilla);
    }
    const productoCollection=document.querySelectorAll('.producto__container');
    const containerColor=document.querySelectorAll('.producto__contcolor');
    const containerSize=document.querySelectorAll('.producto__contsize');
    for (let c = 0; c < productoCollection.length; c++) {
        productoCollection[c].dataset.idProducto=productos[c].id;
        productoCollection[c].querySelector('.producto__name').textContent=productos[c].nombre;
        productoCollection[c].querySelector('.producto__description').textContent=productos[c].descripcion;
        productoCollection[c].querySelector('.producto__prize').textContent=`$ ${productos[c].precio}`;
        productoCollection[c].querySelectorAll('.producto__increase').forEach(increase => {
            increase.dataset.btnIncreaseProducto=productos[c].id;
        });
        productoCollection[c].querySelectorAll('.producto__decrease').forEach(decrease=> {
            decrease.dataset.btnDecreaseProducto=productos[c].id;
        });
        productoCollection[c].querySelectorAll('.producto__quantity').forEach(quantity => {
            quantity.dataset.cantidadProducto=productos[c].id;
        });
        productoCollection[c].querySelectorAll('.producto__btn-carrito').forEach(btnCar => {
            btnCar.dataset.btnCarritoProducto=productos[c].id
        });
        productos[c].colores.forEach(color => {
            const plantillaColor=`
                <div class="producto__color selection ">
                    <input
                        style="background-color: ${coloresHexagesimal[color]}"
                        type="radio"
                        data-color="${color}"
                        data-btn-color-producto="${productos[c].id}"
                        name="color-negro"
                        value="negro"/>
                    <label style="text-transform:capitalize" for="color-${color}">${color}</label>
                </div>`;   
            containerColor[c].innerHTML+=plantillaColor;
        });
        
        productos[c].tamaños.forEach(size => {
            const plantillaSize=`
                <div class="producto__size selection">
                    <input
                        type="radio"
                        data-btn-size-producto="${productos[c].id}"
                        data-size="${size}"
                        class="producto__radio-input"
                        value="${size}"/>
                    <label for="${size}">${size}</label>
                </div>`;
            containerSize[c].innerHTML+=plantillaSize;
        });
        containerColor[c].querySelector('.producto__color').classList.add('selection--active');
        containerSize[c].querySelector('.producto__size').classList.add('selection--active');
    };
    
    console.log(containerColor[0].querySelector('.producto__color'));
} else {
    conntainerProductos.style.display='none';
    advisorNoProducto.style.display='block';
}



