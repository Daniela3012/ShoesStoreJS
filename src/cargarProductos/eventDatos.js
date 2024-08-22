import dataSet from '../data/productos';
const {productos} = dataSet;
const containerColor=document.querySelectorAll('.producto__contcolor');
const containerSize=document.querySelectorAll('.producto__contsize');
const containerIncrease=document.querySelectorAll('.producto__increase');
const containerDecrease=document.querySelectorAll('.producto__decrease');




export const getColor = (eve) => {
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

export const getSize = (eve) => {
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
        })
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