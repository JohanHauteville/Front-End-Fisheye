//*********    CODE DE LA LIGHTBOX   *********//


const mainElements = document.querySelector('main')
const lightBox = document.getElementById('light-box')
const closeBtn = document.querySelector('.light-box-close')
const mediaBox = document.querySelector('.media-light-box')
const nextMediaBtn = document.querySelector('#btn-next-media')
const previousMediaBtn = document.querySelector('#btn-previous-media')
let indexNumber = 0
let arrayOfIndexLength = 0
const  focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

closeBtn.addEventListener('click', closeLightbox)
closeBtn.addEventListener('keydown', event=>{
    if(event.key==='Enter'){
        closeLightbox()
    }
})
nextMediaBtn.addEventListener('click',nextMedia)
previousMediaBtn.addEventListener('click',previousMedia)

/////// GÈRE LA NAVIGATION CLAVIER DANS LA LIGHTBOX ///////
lightBox.addEventListener('keydown', event =>{
    // Dans un premier temps, permet de désactiver le comportement par défaut des touches.
    (event.key === 'ArrowUp' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        event.key === 'Space' ||
        event.key === 'Escape') &&
       event.preventDefault();
    if(event.key === "Escape"){
       closeLightbox()
    } else if(event.key === "ArrowLeft"){
        previousMedia()
    } else if(event.key === "ArrowRight"){
        nextMedia()
    }
})

/////// BOUCLE LE FOCUS DANS LA LIGHTBOX ///////
const firstFocusableElement = lightBox.querySelectorAll(focusableElements)[0]; // Récupère le premier élement focussable dans la LightBox
const focusableContent = lightBox.querySelectorAll(focusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1]; // Récupère le dernier élement focussable dans la LightBox
lightBox.addEventListener('keydown', function(e) {  
    let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
    // Sort de la boucle si TAB n'est pas utilisé
    if (!isTabPressed) {
      return;
    }
    if (e.shiftKey) { // Si SHIFT + TAB est utilisé
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus(); // Le focus est mis sur le dernier element de la modale
        e.preventDefault();
      }
    } else { // Si TAB est utilisé...
      if (document.activeElement === lastFocusableElement) { //... et si en utilisant TAB on arrive au dernier élément de la modale
        firstFocusableElement.focus(); // Le focus cible alors le premier élément de la modale
        e.preventDefault();
      }
    }
});

/////// FONCTION D'OUVERTURE DE LA LIGHTBOX ///////
export function showLightbox(mediaId){
    // Affiche la LightBox
    lightBox.style.display = "flex"
    lightBox.setAttribute("aria-hidden",false)
    mainElements.setAttribute("aria-hidden",true)

    // Le focus est placé sur le bouton previous
    previousMediaBtn.focus()

    // Permet de récupérer la taille maximale du tableau
    const arrayOfDataIndexNumber = document.querySelectorAll('[data-index-number]')
    arrayOfIndexLength = arrayOfDataIndexNumber.length 

    const mediaToShow = document.querySelector(`[data-media-id="${mediaId}"]`)

    // récupère l'index du média afficher dans la variable globale indexNumber.
    // cela nous permettra de l'utiliser dans les fonctions permettant d'afficher le média suivant/précédent
    indexNumber = mediaToShow.getAttribute("data-index-number")

    // Permet de copier le Node présent dans la grille de médias
    const copyMedia = mediaToShow.cloneNode()
    const titleElement = document.createElement("p")

    // récupère le titre de la copie du Node
    const titleFromCopy = copyMedia.getAttribute("alt")
    titleElement.textContent = titleFromCopy

    // Permet à l'utilisateur d'avoir le controle sur la vidéo
    copyMedia.setAttribute("controls","")

    mediaBox.appendChild(copyMedia)
    mediaBox.appendChild(titleElement)
}

/////// FONCTION DE FERMETURE DE LA LIGHTBOX ///////
function closeLightbox(){
    // Permet lors de la fermeture de la lightbox de placer le focus sur le dernier élément affiché
    const mediaToReturnFocus = document.querySelector(`[data-index-number="${indexNumber}"]`)
    mediaToReturnFocus.focus()
    indexNumber=0
    mediaBox.innerHTML = ''  
    lightBox.style.display = "none"
    lightBox.setAttribute("aria-hidden",true)
    mainElements.setAttribute("aria-hidden",false)
}

/////// FONCTION DU BOUTON NEXT DE LA LIGHTBOX ///////
function nextMedia(){
    // permet de bouclier sur le premier média si le dernier a été atteint
    if(indexNumber>=arrayOfIndexLength-1){
        indexNumber=0
    } else{
        indexNumber++
    }
    const mediaToShow = document.querySelector(`[data-index-number="${indexNumber}"]`)

    const copyMedia = mediaToShow.cloneNode()
    copyMedia.setAttribute("controls","")
    const titleElement = document.createElement("p")
    const titleFromCopy = copyMedia.getAttribute("alt")
    titleElement.textContent = titleFromCopy

    mediaBox.innerHTML=""
    mediaBox.appendChild(copyMedia)
    mediaBox.appendChild(titleElement)
}

/////// FONCTION DU BOUTON PREVIOUS DE LA LIGHTBOX ///////
function previousMedia(){
    // permet de bouclier sur le dernier média si le premier a été atteint
    if(indexNumber==0){
        indexNumber=arrayOfIndexLength-1
    } else{
        indexNumber--
    }
    const mediaToShow = document.querySelector(`[data-index-number="${indexNumber}"]`)

    const copyMedia = mediaToShow.cloneNode()
    copyMedia.setAttribute("controls","")
    const titleElement = document.createElement("p")
    const titleFromCopy = copyMedia.getAttribute("alt")
    titleElement.textContent = titleFromCopy

    mediaBox.innerHTML=""
    mediaBox.appendChild(copyMedia)
    mediaBox.appendChild(titleElement)

}
