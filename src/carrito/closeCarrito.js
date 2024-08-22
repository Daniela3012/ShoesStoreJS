const closeCarrito = document.querySelector('.carrito__head svg');
const carritoResumen = document.querySelector('.carrito');

closeCarrito.addEventListener('click', (eve)=>{
    carritoResumen.classList.remove('display-active-carrito');
});