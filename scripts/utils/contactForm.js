const btn = document.querySelector('.contact_button')
btn.addEventListener('click',displayModal)
const btnClose = document.querySelector('.contact-close')
btnClose.addEventListener('click',closeModal)
const titleModal = document.getElementById('modal-title');
const modal = document.getElementById("contact_modal");
const mainElements = document.querySelector("main");

const btnSend = document.querySelector('.send_button');
btnSend.addEventListener('click',sendData);

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


modal.addEventListener("keydown", function(e){
    console.log(e.key);
    if(e.key === "Escape"){
        closeModal()
    }
})

export function sendData(){
    // Code d'envoi des données
    //closeModal()
    //location.reload()
    //event.preventDefault()
}