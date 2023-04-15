//*********    PAGE DU PHOTOGRAPHE    *********//

import { mediaFactory } from '../factories/mediaFactory.js'
import { photographerFactory } from '../factories/photographer.js'

// RÉCUPÈRE LES DONNÉES DU PHOTOGRAPHE ET DES MÉDIAS
async function getPhotographers() {
    const response = await fetch("/data/photographers.json")
    const fetchedData = await response.json()

    // Retourne le tableau des medias seulement une fois qu'il a été récupéré
    return (fetchedData)
}

// AFFICHE LES MÉDIAS DU PHOTOGRAPHE
export default async function displayMedia(medias) {
    const mediasSection = document.querySelector(".photograph-media-section");
    mediasSection.innerHTML = ""
    medias.forEach((media) => {
        const photographerModel = mediaFactory(media);
        const userMediaDOM = photographerModel.getUserMediaDOM();
        mediasSection.appendChild(userMediaDOM);
    });
}

// AFFICHE LES INFORMATIONS DU PHOTOGRAPHE
async function displayData(photographers) {
    let params = (new URL(document.location)).searchParams;
    let userId = parseInt(params.get('id')); // on récupère l'id du photographe depuis l'url
    const photographersSection = document.querySelector(".photograph-header");
    const photographerMediaSection = document.querySelector("main");

    photographers.forEach((photographer) => {
        //On trie les photographes pour récupérer UNIQUEMENT celui qui correspond à l'id récupéré au-dessus
        if (photographer.id === userId) {
            const photographerModel = photographerFactory(photographer);
            const popUp = photographerModel.getPriceDOM();
            photographerMediaSection.appendChild(popUp);

            //On utilise la fonction d'affichage du profil pour la page du photographe
            const userCardDOM = photographerModel.getUserProfileDOM();
            photographersSection.appendChild(userCardDOM);
        }
    });
}

// TRIE DES MÉDIAS DU PHOTOGRAPHE
export async function mediaFilterbyUser(medias) {
    let params = (new URL(document.location)).searchParams;
    let userId = parseInt(params.get('id')); // on récupère l'id du photographe depuis l'url

    const mediaOrdonne = Array.from(medias)
    //on filtre les medias en fonction de l'id du photographe récupéré au-dessus
    const mediaFiltre = mediaOrdonne.filter(function (med) {
        return med.photographerId === userId
    })
    return mediaFiltre
}

// DÉFINIT LE TOTAL DE LIKES ET L'AFFICHE
export function getLikes() {
    let totalOfLikes = 0
    const allLikes = document.getElementsByClassName('number-of-likes')
    const popUp = document.querySelector('.pop-likes')
    const arrayOfLikes = Array.from(allLikes)

    arrayOfLikes.forEach(element => {
        totalOfLikes = totalOfLikes + parseInt(element.textContent, 10)
    })
    popUp.innerHTML = totalOfLikes + "<i class=\"fa-solid fa-heart\">"
}

// INITIALISE LA PAGE
async function init() {
    // Récupère les médias des photographes depuis le LocalStorage
    let medias = localStorage.getItem("medias")
    if (medias === null) {
        // si les données n'existent pas on les récupères puis on les ajoutent au LocalStorage...
        const { media } = await getPhotographers();
        medias = media
        const valeurMedia = JSON.stringify(media)
        localStorage.setItem("medias", valeurMedia)
        console.log("Enregistrement dans le localStorage");
    } else {
        // ...sinon on utilise celles contenuent dans le LocalStorage
        medias = JSON.parse(medias)
        console.log("Utilisation du localStorage");
    }
    // on récupère les photographes
    const { photographers } = await getPhotographers();

    // on affiche seulement celui que nous voulons
    displayData(photographers);

    // on filtre les medias du photographe 
    const mediaFiltres = await mediaFilterbyUser(medias)

    // on affiche les médias du photographe
    await displayMedia(mediaFiltres);
    
    // on récupère et affiche le total de likes
    getLikes()
}

init();

