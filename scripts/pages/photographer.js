//Mettre le code JavaScript lié à la page photographer.html

import {mediaFactory} from '../factories/mediaFactory.js'
import {photographerFactory} from '../factories/photographer.js'

async function getPhotographers() {

    const response = await fetch("/data/photographers.json")
    const fetchedData = await response.json()
    
    // Retourne le tableau des medias seulement une fois qu'il a été récupéré
    return(fetchedData)
}

async function displayMedia(medias) {

    let params = (new URL(document.location)).searchParams;
    let userId = parseInt(params.get('id')); // on récupère l'id du photographe depuis l'url

    const mediasSection = document.querySelector(".photograph-media-section");

    medias.forEach((media) => {
        if(media.photographerId === userId){
            const photographerModel = mediaFactory(media);
            const userMediaDOM = photographerModel.getUserMediaDOM();
            console.log(userMediaDOM);
            mediasSection.appendChild(userMediaDOM);
        }
    });
}
async function displayData(photographers) {
    let params = (new URL(document.location)).searchParams;
    let userId = parseInt(params.get('id')); // on récupère l'id du photographe depuis l'url
    const photographersSection = document.querySelector(".photograph-header");
    const photographerMediaSection = document.querySelector("main");

    photographers.forEach((photographer) => {
        if(photographer.id === userId){
            const photographerModel = photographerFactory(photographer);
            const popUp = photographerModel.getPriceDOM();
            photographerMediaSection.appendChild(popUp);
            const userCardDOM = photographerModel.getUserProfileDOM();
            photographersSection.appendChild(userCardDOM);
        }
    });
}




async function init() {
    // Récupère les datas des photographes
    const { media } = await getPhotographers();
    const { photographers } = await getPhotographers();
    displayData(photographers);
    displayMedia(media);
}
    
init();

