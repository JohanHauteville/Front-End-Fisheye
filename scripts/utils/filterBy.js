
const btnFilter = document.querySelector('.btn-filter');
btnFilter.addEventListener('click',handleFilters);

const listOfFilters = document.querySelector('.list-filter')
listOfFilters.style.display = "none"

const allFilters = document.querySelectorAll('.list-filter li')
console.log(allFilters);
// allFilters.forEach(element => {
//     element.addEventListener('click',() =>{
//         btnFilter.innerHTML= element.textContent + "<i class=\"fa-solid fa-chevron-down\">"
//         switch(element.textContent){
//             case 'Popularité':
//                 console.log('Tri par popularité')
//                 break
//             case 'Date':
//                 console.log('Tri par Date')
//                 break
//             case 'Titre':
//                 console.log('Tri par Titre')
//                 break
//             default:
//                 console.log('Aucun tri');
//                 break
//         }
//         handleFilters()
//     })
// });

// state pattern
function handleFilters(){
    if(listOfFilters.style.display === "none"){
        listOfFilters.style.display = "block"
        listOfFilters.focus()
        btnFilter.setAttribute("aria-expanded",true)
        //Supprime le "focus" visible
        allFilters.forEach(element => element.classList.remove('is-selected'))
    }else if(listOfFilters.style.display === "block"){
        listOfFilters.style.display = "none"
        btnFilter.setAttribute("aria-expanded",false)
        btnFilter.focus()
    }
}

listOfFilters.addEventListener("keydown", function(e){
    //console.log(e.key)
    if(e.key === "Escape"){
       handleFilters()
    }
})

let indice = 0
listOfFilters.addEventListener("keyup", function(e){
    if(e.key === "Enter" && indice >=1){
        handleFilters()
        indice = 0
    } else{
        indice++
    }
})

/////  EVENEMENT CLICK  //////////
listOfFilters.addEventListener('click', event => {
    let option = event.target.closest('li')
    console.log(option);
    if (!option){// return
        console.log("return!");
        allFilters.forEach(element => {
            if(element.getAttribute('aria-selected')===true){
                option = element
                console.log("sa passe !")
            }
        })
    }
  
    // Change la valeur de aria-activedescendant 
    listOfFilters.setAttribute('aria-activedescendant', option.id)
    btnFilter.innerHTML= option.textContent + "<i class=\"fa-solid fa-chevron-down\">"
    console.log("innerHTML");
    handleFilters()
  
    // Changement de l'apparence visuelle
    allFilters.forEach(element => element.classList.remove('is-selected'))
    option.classList.add('is-selected')

    // Change la valeur de aria-selected
    allFilters.forEach(element => element.setAttribute("aria-selected",false))
    option.setAttribute("aria-selected",true)
  })

/////  EVENEMENTS CLAVIER  //////////
listOfFilters.addEventListener('keydown', event => {
    const { key } = event

    if (key === 'ArrowDown' || key === 'ArrowUp'){
        listOfFilters.addEventListener('keydown' , disableArrowKeys, false);
        listOfFilters.addEventListener('keyup'   , disableArrowKeys, false);
 
        const activeElementID = listOfFilters.getAttribute('aria-activedescendant')
        const activeElement = listOfFilters.querySelector('#' + activeElementID)

        let selectedOption 
        if (key === 'ArrowDown') selectedOption = activeElement.nextElementSibling
        if (key === 'ArrowUp') selectedOption = activeElement.previousElementSibling

        
        if (selectedOption) {     
            // Change la valeur de aria-activedescendant
            listOfFilters.setAttribute('aria-activedescendant', selectedOption.id)
        
            // Changement de l'apparence visuelle
            allFilters.forEach(element => element.classList.remove('is-selected'))
            selectedOption.classList.add('is-selected')

            // Change la valeur de aria-selected
            allFilters.forEach(element => element.setAttribute("aria-selected",false))
            selectedOption.setAttribute("aria-selected",true)
        }
    } else if(key === 'Enter'){

        const activeElementID = listOfFilters.getAttribute('aria-activedescendant')
        const activeElement = listOfFilters.querySelector('#' + activeElementID)

        // Permet de changer le texte du bouton quand il est utilisé
        btnFilter.innerHTML= activeElement.textContent + "<i class=\"fa-solid fa-chevron-down\">"
        handleFilters()
    }

})


//function pour desactiver le scroll avec les touches fléchées
function disableArrowKeys(evt) {
    (evt.keyCode === 37 ||
     evt.keyCode === 38 ||
     evt.keyCode === 39 ||
     evt.keyCode === 40) &&
    evt.preventDefault();
}
