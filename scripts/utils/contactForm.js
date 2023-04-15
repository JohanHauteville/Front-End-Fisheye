//*********    CODE DU FORMULAIRE DE CONTACT    *********//

const btn = document.querySelector('.contact_button')
const btnClose = document.querySelector('.contact-close')
const titleModal = document.getElementById('modal-title');
const modal = document.getElementById("contact_modal");
const mainElements = document.querySelector("main");
const inputOfFirst = document.getElementById('first')
const inputOfLast = document.getElementById('last')
const inputOfMail = document.getElementById('mail')
const inputOfMessage = document.getElementById('message')
const btnSend = document.querySelector('.send_button');


btn.addEventListener('click', displayModal)       // Affiche la modale au click du "contacter moi"
btnClose.addEventListener('click', closeModal)    // Ferme la modale au click du "X"
btnSend.addEventListener('click', sendData);      // Affiche les données envoyées par le formulaire au click du bouton

// On définit tous les éléments qui peuvent récupérer le focus dans notre modale
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// AFFICHE LA MODALE
function displayModal() {
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", false)
  modal.setAttribute("aria-modal", true)
  mainElements.setAttribute("aria-hidden", true)
  // Focus mis sur le titre de la modale
  titleModal.focus()
}

// FERME LA MODALE
function closeModal() {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", true)
  mainElements.setAttribute("aria-hidden", false)
  btn.focus()
}


function sendData() {
  if (
    // Vérification de chacun des champs
    checkTextarea() &
    checkString("first") &
    checkString("last") &
    checkEmail()
  ) {
    // Affiche les données du formulaire
    console.log(`Envoi du formulaire:
    Prénom: ${inputOfFirst.value}
    Nom: ${inputOfLast.value}
    Email: ${inputOfMail.value}
    Message: ${inputOfMessage.value}
    `);
    // ferme la modale
    closeModal()
    // Vide les données une fois envoyées
    inputOfFirst.value = ""
    inputOfLast.value = ""
    inputOfMail.value = ""
    inputOfMessage.value = ""
  }
  // bloque le comportement par défault du formulaire (recharge de la pagee,...)
  event.preventDefault()

}

// On récupère le premier element focussable de notre modale
const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];

// On récupère l'intégralité des élements focussable de notre modale
const focusableContent = modal.querySelectorAll(focusableElements);

// On récupère le dernier élement focussable de notre modale
const lastFocusableElement = focusableContent[focusableContent.length - 1];

// EVENT LISTENER POUR LES TOUCHES DU CLAVIER DANS LA MODALE
modal.addEventListener('keydown', function (e) {

  let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

  //Ferme la modale si ECHAP est utilisé
  if (e.key === "Escape") {
    closeModal()
  }

  // Sort de la boucle si TAB n'est pas utilisé
  if (!isTabPressed) {
    return;
  }

  // Si SHIFT + TAB est utilisé...
  if (e.shiftKey) { 
    if (document.activeElement === firstFocusableElement) {//... et si on arrive au premier élément de la modale
      lastFocusableElement.focus(); // Le focus est mis sur le dernier element de la modale
      e.preventDefault();
    }
  } else { // Si TAB est utilisé ...
    if (document.activeElement === lastFocusableElement) { //... et si en utilisant TAB on arrive au dernier élément de la modale
      firstFocusableElement.focus(); // Le focus cible alors le premier élément de la modale
      e.preventDefault();
    }
  }
});

// Lance la vérification du champs quand on sort de celui-ci
inputOfFirst.addEventListener('focusout', () => {
  checkString("first")
})
inputOfLast.addEventListener('focusout', () => {
  checkString("last")
})
inputOfMail.addEventListener('focusout', checkEmail)
inputOfMessage.addEventListener('focusout', checkTextarea)



// fonction d'affichage / désaffichage d'un champs incorrect
function affichageErreur(inputId, text) {
  if (text === "DEL") {    // On supprime l'affichage de l'erreur
    document.getElementById(inputId).removeAttribute("data-error-visible");
    document.getElementById(inputId).setAttribute("data-valid-visible", "");

  } else if (text === "ADD") {   // On affiche l'erreur 
    document.getElementById(inputId).setAttribute("data-error-visible", "");
    document.getElementById(inputId).removeAttribute("data-valid-visible");
  }
}

// fonction de contrôle de l'email
function checkEmail() {
  const regex = /^([a-zA-Z0-9-.]+)(@)([a-zA-Z-]+)\.([a-zA-Z]{2,})$/mg;  // Regex de test
  if (/@/.test(inputOfMail.value) === false) {                    // Test de la présence de '@'
    affichageErreur('mail', "ADD");
  } else if (/(@)([a-zA-Z-]+)\.([a-zA-Z]{2,})$/mg.test(inputOfMail.value) === false) {     // Test de la présence du nom de domaine complet
    affichageErreur('mail', "ADD");
  } else if (regex.test(inputOfMail.value)) {           // Vérification du reste de l'adresse email (avant le '@')
    affichageErreur('mail', "DEL");
    return true;
  } else {
    affichageErreur('mail', "ADD");
  }
  return false;
}

// fonction de contrôle d'une chaine
function checkString(elementID) {
  const regex = /^[a-zA-Z-\s]{2,}$/mg;

  const valueOfInput = document.getElementById(elementID).value;
  if (regex.test(valueOfInput)) {
    affichageErreur(elementID, "DEL")
    return true
  } else {
    affichageErreur(elementID, "ADD")
    return false
  }
}

// fonction de contrôle du message
function checkTextarea() {
  const regex = /\w[a-zA-Z0-9-.\s]{2,}/mg;
  const valueOfTextarea = document.getElementById('message').value
  if (regex.test(valueOfTextarea)) {
    affichageErreur("message", "DEL")
    return true
  } else {
    affichageErreur("message", "ADD")
    return false
  }
}
