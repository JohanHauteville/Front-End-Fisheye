//*********    CODE DU FILTRE   *********//

import { mediaFilterbyUser } from '../pages/photographer.js'
import displayMedia from '../pages/photographer.js'
const btnFilter = document.querySelector('.btn-filter');
const listOfFilters = document.querySelector('.list-filter')
const allFilters = document.querySelectorAll('.list-filter li')


// On récupère les médias créés lors de l'initialisation de la page depuis le LocalStorage
let media = localStorage.getItem("medias")
let mediaFiltre
if (media === null) {
    console.log("Pas de LocalStorage");
} else {
    media = await JSON.parse(media)
    mediaFiltre = await mediaFilterbyUser(media)
}

// permet d'attendre la génération des medias pour leur attribuer un data-set
setTimeout(setDataIndexNumber, 300)

// EventListener pour ouvrir ou fermer la liste des filtres au click
btnFilter.addEventListener('click', handleFilters);

// Désaffiche la liste du bouton de filtres
listOfFilters.style.display = "none"

// PERMET LA MODIFICATION D'UN LIKE
export default function modifyLike(likeID, option) {
    mediaFiltre.forEach(element => {
        if (element.id === likeID && option === 'INC') {
            element.likes++
        } else if (element.id === likeID && option === 'DEC') {
            element.likes--
        }
    })
}

// OUVRE OU FERME LA LISTE DES FILTRES EN FONCTION DE SON ÉTAT
function handleFilters() {
    if (listOfFilters.style.display === "none") {
        listOfFilters.style.display = "block"
        listOfFilters.focus()
        btnFilter.setAttribute("aria-expanded", true)
        //Supprime le "focus" visible
        allFilters.forEach(element => element.classList.remove('is-selected'))
    } else if (listOfFilters.style.display === "block") {
        listOfFilters.style.display = "none"
        btnFilter.setAttribute("aria-expanded", false)
        // Lors de la fermeture de la liste, le focus est mis sur le bouton
        btnFilter.focus()
    }
}

// EVENTLISTENER FERMER LA LISTE DES FILTRES AVEC LA TOUCHE 'ECHAP'
listOfFilters.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        handleFilters()
    }
})

// EVENTLISTENER POUR EVITER LES ERREURS LORS DE L'UTILISATION DE LA TOUCHE 'ENTER'
let indice = 0
listOfFilters.addEventListener("keyup", function (e) {
    if (e.key === "Enter" && indice >= 1) {
        handleFilters()
        indice = 0
    } else {
        indice++
    }
})


// EVENEMENTS DU CLICK DANS LA LISTE DES FILTRES
listOfFilters.addEventListener('click', event => {

    // Récupère l'option la plus proche du click
    let option = event.target.closest('li')

    // Change la valeur de aria-activedescendant 
    listOfFilters.setAttribute('aria-activedescendant', option.id)
    btnFilter.innerHTML = option.textContent + "<i class=\"fa-solid fa-chevron-down\">"

    handleFilters()
    filtrageMedia(option.id)

    // Changement de l'apparence visuelle
    allFilters.forEach(element => element.classList.remove('is-selected'))
    option.classList.add('is-selected')

    // Change la valeur de aria-selected
    allFilters.forEach(element => element.setAttribute("aria-selected", false))
    option.setAttribute("aria-selected", true)
})

// EVENEMENTS DU CLAVIER DANS LA LISTE DES FILTRES
listOfFilters.addEventListener('keydown', event => {
    const { key } = event

    if (key === 'ArrowDown' || key === 'ArrowUp') {
        // désactive le comportement par défaut des touches (pour éviter que la page en arrière plan soit scrollée)
        listOfFilters.addEventListener('keydown', disableArrowKeys, false);
        listOfFilters.addEventListener('keyup', disableArrowKeys, false);

        // Récupère l'élément actif
        const activeElementID = listOfFilters.getAttribute('aria-activedescendant')
        const activeElement = listOfFilters.querySelector('#' + activeElementID)

        let selectedOption
        // Récupère l'élement de même niveau suivant si la touche "flèche du bas" est utilisée
        if (key === 'ArrowDown') selectedOption = activeElement.nextElementSibling

        // Récupère l'élement de même niveau précédent si la touche "flèche du haut" est utilisée
        if (key === 'ArrowUp') selectedOption = activeElement.previousElementSibling


        if (selectedOption) {
            // Change la valeur de aria-activedescendant
            listOfFilters.setAttribute('aria-activedescendant', selectedOption.id)

            // Changement de l'apparence visuelle
            allFilters.forEach(element => element.classList.remove('is-selected'))
            selectedOption.classList.add('is-selected')

            // Change la valeur de aria-selected
            allFilters.forEach(element => element.setAttribute("aria-selected", false))
            selectedOption.setAttribute("aria-selected", true)
        }
    } else if (key === 'Enter') {

        const activeElementID = listOfFilters.getAttribute('aria-activedescendant')
        const activeElement = listOfFilters.querySelector('#' + activeElementID)

        // Permet de changer le texte du bouton quand il est utilisé
        btnFilter.innerHTML = activeElement.textContent + "<i class=\"fa-solid fa-chevron-down\">"
        // ferme la liste des filtres
        handleFilters()
        // filtre les médias en fonction de l'élément choisit
        filtrageMedia(activeElementID)
    }

})


// FONCTION pour desactiver le scroll avec les touches fléchées
function disableArrowKeys(evt) {
    (evt.keyCode === 37 ||
        evt.keyCode === 38 ||
        evt.keyCode === 39 ||
        evt.keyCode === 40) &&
        evt.preventDefault();
}

// FONCTION DE FILTRAGE DES MÉDIAS
async function filtrageMedia(filtre) {
    switch (filtre) {
        case 'popularity':
            mediaFiltre.sort(function (a, b) {
                return b.likes - a.likes
            })
            // Affiche les medias filtrés
            displayMedia(mediaFiltre)
            // mise à jour des data-index-number
            setDataIndexNumber()
            break
        case 'date':
            mediaFiltre.sort((a, b) => a.date.localeCompare(b.date))
            displayMedia(mediaFiltre)
            setDataIndexNumber()
            break
        case 'title':
            mediaFiltre.sort((a, b) => a.title.localeCompare(b.title))
            displayMedia(mediaFiltre)
            setDataIndexNumber()
            break
        default:
            console.log('Aucun tri');
            break
    }
}

// FONCTION D'AJOUT DES DATA-INDEX-NUMBER
function setDataIndexNumber() {
    // on récupère tous les élements ".media-grid" qui représentent tous les médias affichés
    const arrayOfMedia = document.querySelectorAll('.media-grid')
    let indice = 0
    // Nous allons leur donner un indice croissant en fonction de leur position.
    // Cette fonctionnalité va nous servir lors de l'affichage de la lightbox pour passer à l'élement suivant ou précédent.
    // En effet pour chaque filtre choisit, l'ordre des médias sera changé.
    arrayOfMedia.forEach(media => {
        media.setAttribute("Data-index-number", indice)
        const mediaId = media.getAttribute("data-media-id")
        indice++
        let storageMedia = localStorage.getItem(mediaId)
        // Nous allons vérifier ici la présence du media dans le localStorage.
        // SI ce n'est pas le cas nous allons l'y placée, en ajoutant au passage un "trigger" qui nous sera utile pour 
        // Eviter de pouvoir ajouter des likes à chaque fois que nous changeons de filtre.
        if (storageMedia === null) {
            console.log("Pas de LocalStorage pour ce trigger");
            let trigger = { trigger: false }
            let valeurTrigger = JSON.stringify(trigger)
            localStorage.setItem(mediaId, valeurTrigger)
        }
    })
}

