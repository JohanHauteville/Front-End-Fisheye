
// const allLink = document.querySelectorAll('.photograph-media-section a')
// console.log(allLink);

// const allArticle = document.getElementsByClassName('media-link')
// console.log(allArticle);




const lightBox = document.getElementById('light-box')

const closeBtn = document.querySelector('.light-box-close')
closeBtn.addEventListener('click', closeLightbox)
const mediaBox = document.querySelector('.media-light-box')
// const mediaInsert = document.createElement('img')
const nextMediaBtn = document.querySelector('#btn-next-media')
nextMediaBtn.addEventListener('click',nextMedia)
const previousMediaBtn = document.querySelector('#btn-previous-media')
previousMediaBtn.addEventListener('click',previousMedia)
let indexNumber = 0
let arrayOfIndexLength = 0
console.log("Fichier lightBox chargé");

lightBox.addEventListener('keydown', event =>{
    //event.preventDefault()
    (event.key === 'ArrowUp' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        event.key === 'Space' ||
        event.key === 'Escape') &&
       event.preventDefault();
    if(event.key === "Escape"){
       closeLightbox()
       console.log("bouton echap pressed");
    } else if(event.key === "ArrowLeft"){
        previousMedia()
    } else if(event.key === "ArrowRight"){
        nextMedia()
    }
})


export function showLightbox(mediaId){

   console.log(`Indexnumber on ShowLightBox = ${indexNumber}`);

    lightBox.style.display = "flex"
    lightBox.setAttribute("aria-hidden",false)
    previousMediaBtn.focus()
    console.log("eventlistener");


    const arrayOfDataIndexNumber = document.querySelectorAll('[Data-index-number]')
    arrayOfIndexLength = arrayOfDataIndexNumber.length 

    const mediaToShow = document.querySelector(`[data-media-id="${mediaId}"]`)
    indexNumber = mediaToShow.getAttribute("data-index-number")
    console.log(`Indexnumber on ShowLightBox after getattribute = ${indexNumber}`);

    const copyMedia = mediaToShow.cloneNode()
    copyMedia.setAttribute("controls","")

    mediaBox.appendChild(copyMedia)

}

function closeLightbox(){
    // const centralImage = document.querySelector('.media-light-box [data-index-number]')
    // indexNumber = centralImage.getAttribute("data-index-number")
    // console.log("centralImage =");
    // console.log(centralImage);
    // console.log(`IndexNumber = ${indexNumber}`);
    indexNumber=0
    mediaBox.innerHTML = ''  
    lightBox.style.display = "none"
}

function nextMedia(){
    if(indexNumber>=arrayOfIndexLength-1){
        indexNumber=0
    } else{
        indexNumber++
    }
    console.log(`indexNumber= ${indexNumber}`);
    const mediaToShow = document.querySelector(`[data-index-number="${indexNumber}"]`)
    console.log(mediaToShow);

    const copyMedia = mediaToShow.cloneNode()
    copyMedia.setAttribute("controls","")

    mediaBox.innerHTML=""
    mediaBox.appendChild(copyMedia)


}


function previousMedia(){
    if(indexNumber==0){
        indexNumber=arrayOfIndexLength-1
    } else{
        indexNumber--
    }
    console.log(indexNumber);
    console.log(`indexNumber= ${indexNumber}`);
    const mediaToShow = document.querySelector(`[data-index-number="${indexNumber}"]`)
    console.log(mediaToShow);

    const copyMedia = mediaToShow.cloneNode()
    copyMedia.setAttribute("controls","")

    mediaBox.innerHTML=""
    mediaBox.appendChild(copyMedia)
}
