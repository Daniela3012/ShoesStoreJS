const itemCarrito=document.querySelector('.hero__item--carrito');
const carritoResumen = document.querySelector('.carrito');

itemCarrito.addEventListener('click', (eve)=>{
    eve.preventDefault();
    carritoResumen.classList.toggle('display-active-carrito');
});