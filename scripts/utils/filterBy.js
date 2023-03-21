
const btnFilter = document.querySelector('.btn-filter');
btnFilter.addEventListener('click',handleFilters);
// const bdyEvent= document.querySelector('body')
const liste = document.querySelector('.list-filter')
liste.addEventListener('click',handleFilters)
// bdyEvent.addEventListener('click',function(){
//     if(listOfFilters.style.display === "block"){
//         listOfFilters.style.display = "none"
//     }
// })
const listOfFilters = document.querySelector('.list-filter')
listOfFilters.style.display = "none"

// state pattern
export function handleFilters(){
    if(listOfFilters.style.display === "none"){
        listOfFilters.style.display = "block"
    }else if(listOfFilters.style.display === "block"){
        listOfFilters.style.display = "none"
    }
}
