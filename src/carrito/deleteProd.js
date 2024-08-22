import { getAllDates } from "./agregarCarrito";



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
