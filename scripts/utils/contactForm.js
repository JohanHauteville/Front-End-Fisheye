const btn = document.querySelector('.contact_button')
btn.addEventListener('click',displayModal)
const btnClose = document.querySelector('.contact-close')
btnClose.addEventListener('click',closeModal)
const titleModal = document.getElementById('modal-title');
const modal = document.getElementById("contact_modal");
const mainElements = document.querySelector("main");

const btnSend = document.querySelector('.send_button');
btnSend.addEventListener('click',sendData);

const  focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function displayModal() {
    modal.style.display = "flex"; 
    modal.setAttribute("aria-hidden",false)
    modal.setAttribute("aria-modal",true)

    mainElements.setAttribute("aria-hidden",true)
     
    mainElements.setAttribute("role",'none')
    titleModal.focus()
    
}

export function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden",true)
    mainElements.setAttribute("aria-hidden",false)
}




export function sendData(){
    // Code d'envoi des données
    //closeModal()
    //location.reload()
    //event.preventDefault()
}


const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
const focusableContent = modal.querySelectorAll(focusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

modal.addEventListener('keydown', function(e) {
    
    let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
    //Ferme la modale si ECHAP est utilisé
    if(e.key === "Escape"){
        closeModal()
    }
    // Sort de la boucle si TAB n'est pas utilisé
    if (!isTabPressed) {
      return;
    }

  
    if (e.shiftKey) { // Si SHIFT + TAB est utilisé
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus(); // Le focus est mis sur le dernier elementde la modale
        e.preventDefault();
      }
    } else { // Si TAB est utilisé...
      if (document.activeElement === lastFocusableElement) { //... et si en utilisant TAB on arrive au dernier élément de la modale
        firstFocusableElement.focus(); // Le focus cible alors le premier élément de la modale
        e.preventDefault();
      }
    }
  });
  
 // firstFocusableElement.focus();