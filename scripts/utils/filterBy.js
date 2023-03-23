
const btnFilter = document.querySelector('.btn-filter');
btnFilter.addEventListener('click',handleFilters);

const listOfFilters = document.querySelector('.list-filter')
listOfFilters.style.display = "none"

const allFilters = document.querySelectorAll('.list-filter li')
allFilters.forEach(element => {
    element.addEventListener('click',() =>{
        btnFilter.innerHTML= element.textContent + "<i class=\"fa-solid fa-chevron-down\">"
        switch(element.textContent){
            case 'Popularité':
                console.log('Tri par popularité')
                break
            case 'Date':
                console.log('Tri par Date')
                break
            case 'Titre':
                console.log('Tri par Titre')
                break
            default:
                console.log('Aucun tri');
                break
        }
        handleFilters()
    })
});

// state pattern
function handleFilters(){
    if(listOfFilters.style.display === "none"){
        listOfFilters.style.display = "block"
    }else if(listOfFilters.style.display === "block"){
        listOfFilters.style.display = "none"
    }
}
