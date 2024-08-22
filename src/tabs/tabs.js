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