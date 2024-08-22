const containreSmallGallery=document.querySelectorAll('.producto__gallery');

containreSmallGallery.forEach(photo => {
    photo.addEventListener('click', (eve)=>{
        if (eve.target.closest('.producto__figure--gallery')) {
            const idProducto=eve.target.closest('.producto__container').dataset.idProducto;
            const producto=document.querySelector(`[data-id-producto="${idProducto}"]`);
            const pathImg=eve.target.closest('.producto__img--gallery').src;
            producto.querySelector('.producto__photo-main img').src=pathImg;
        }
    })
});