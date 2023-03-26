
// const allLink = document.querySelectorAll('.photograph-media-section a')
// console.log(allLink);

// const allArticle = document.getElementsByClassName('media-link')
// console.log(allArticle);

import {getMediaFiltre} from '../utils/filterBy.js'

const lightBox = document.getElementById('light-box')
const closeBtn = document.querySelector('.light-box-close')
closeBtn.addEventListener('click', closeLightbox)
const mediaBox = document.querySelector('.media-light-box')
const mediaInsert = document.createElement('img')
const nextMediaBtn = document.querySelector('#btn-next-media')
nextMediaBtn.addEventListener('click',nextMedia)
const previousMediaBtn = document.querySelector('#btn-previous-media')
previousMediaBtn.addEventListener('click',previousMedia)
let importMediaId


export function showLightbox(mediaId){
    lightBox.style.display = "flex"
    const tableauTest = getMediaFiltre()
    const indiceTableau = getMediaID(mediaId)
    
    const mediaLink = `assets/medias/${tableauTest[indiceTableau].photographerId}/${tableauTest[indiceTableau].image??tableauTest[indiceTableau].video}`;
    mediaInsert.setAttribute("src",mediaLink)
    mediaBox.appendChild(mediaInsert)
    console.log(indiceTableau);
    importMediaId = mediaId
    console.log(importMediaId);
}

function closeLightbox(){
    console.log("close lightbox");
    lightBox.style.display = "none"
}

function nextMedia(){
    console.log("Next button pressed");
    console.log(importMediaId);
    const tableauTest = getMediaFiltre()
    const indiceTableau = getMediaID(importMediaId)
    const mediaLink = `assets/medias/${tableauTest[indiceTableau].photographerId}/${tableauTest[indiceTableau+1].image??tableauTest[indiceTableau+1].video}`;
    mediaInsert.setAttribute("src",mediaLink)
    mediaBox.appendChild(mediaInsert)
    importMediaId = tableauTest[indiceTableau+1].id
}


function previousMedia(){
    console.log("Previous button pressed");
    console.log(importMediaId);
    const tableauTest = getMediaFiltre()
    const indiceTableau = getMediaID(importMediaId)
    const mediaLink = `assets/medias/${tableauTest[indiceTableau].photographerId}/${tableauTest[indiceTableau-1].image??tableauTest[indiceTableau-1].video}`;
    mediaInsert.setAttribute("src",mediaLink)
    mediaBox.appendChild(mediaInsert)
    importMediaId = tableauTest[indiceTableau-1].id
}

function getMediaID(mediaId){
    const tableauTest = getMediaFiltre()
    let indice = 0
    let indiceTableau = 0
    tableauTest.forEach(element => {
        if(element.id === mediaId){
            console.log(element.id + "=" + mediaId);
            indiceTableau = indice
        }else{
            indice =indice +1
        }
    });
    return indiceTableau
}