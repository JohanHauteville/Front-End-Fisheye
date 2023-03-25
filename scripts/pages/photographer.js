//Mettre le code JavaScript lié à la page photographer.html

import {mediaFactory} from '../factories/mediaFactory.js'
import {photographerFactory} from '../factories/photographer.js'


export async function getPhotographers() {

    const response = await fetch("/data/photographers.json")
    const fetchedData = await response.json()

    // Retourne le tableau des medias seulement une fois qu'il a été récupéré
    return(fetchedData)
}

export default async function displayMedia(medias) {
    const mediasSection = document.querySelector(".photograph-media-section");
    mediasSection.innerHTML=""
    medias.forEach((media) => {
            const photographerModel = mediaFactory(media);
            const userMediaDOM = photographerModel.getUserMediaDOM();
            mediasSection.appendChild(userMediaDOM);  
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

export async function mediaFilterbyUser(medias){
    let params = (new URL(document.location)).searchParams;
    let userId = parseInt(params.get('id')); // on récupère l'id du photographe depuis l'url

    const mediaOrdonne = Array.from(medias)
    const mediaFiltre = mediaOrdonne.filter(function(med){
        return med.photographerId === userId
    })
    return mediaFiltre
}

export function getLikes() {
    let totalOfLikes = 0
    const allLikes = document.getElementsByClassName('number-of-likes')

    const popUp = document.querySelector('.pop-likes')
    const arrayOfLikes = Array.from(allLikes)
    arrayOfLikes.forEach(element =>{
        totalOfLikes = totalOfLikes + parseInt(element.textContent,10) 
    })
    console.log(popUp);
    popUp.innerHTML= totalOfLikes + "<i class=\"fa-solid fa-heart\">"
}

async function init() {
    // Récupère les datas des photographes
   
    let medias = localStorage.getItem("medias")
    if(medias===null){
        const { media } = await getPhotographers();
        medias = media
        const valeurMedia = JSON.stringify(media)
        localStorage.setItem("medias",valeurMedia)
        console.log("Enregistrement dans le localStorage");

    } else {
        medias = JSON.parse(medias)
        console.log("Utilisation du localStorage");

    }
    const { photographers } = await getPhotographers();
    displayData(photographers);
    const mediaFiltres = await mediaFilterbyUser(medias)
    displayMedia(mediaFiltres);
    getLikes()
    // photographers.getLikes()
    // mediaFiltres.getLikes
}
    
init();

