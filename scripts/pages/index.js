//*********    PAGE DU D'ACCUEIL    *********//

import { photographerFactory } from '../factories/photographer.js'

// RÉCUPÈRE LES DONNÉES DU PHOTOGRAPHE ET DES MÉDIAS
async function getPhotographers() {
    const response = await fetch("/data/photographers.json")
    const fetchedData = await response.json()

    // Retourne le tableau photographers seulement une fois qu'il a été récupéré
    return (fetchedData)
}

// AFFICHE UNE CARD POUR CHAQUE PHOTOGRAPHE PRÉSENT DANS LE TABLEAU
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

// INITIALISE LA PAGE D'ACCUEIL
async function init() {
    // Récupère UNIQUEMENT les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

