const btn = document.querySelector('.contact_button')
btn.addEventListener('click',displayModal)
const btnClose = document.querySelector('.contact-close')
btnClose.addEventListener('click',closeModal)

export function displayModal() {
    console.log(`click`);
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block"; 
}

export function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}