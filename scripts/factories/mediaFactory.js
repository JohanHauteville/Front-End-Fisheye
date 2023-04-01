import modifyLike from '../utils/filterBy.js'
import {getLikes} from '../pages/photographer.js'
import {showLightbox} from '../utils/lightBox.js'


export function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;
    const mediaLink = `assets/medias/${photographerId}/${image??video}`;

    function getUserMediaDOM() {
        
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        link.setAttribute("class",'media-link')
        
        const mediaName = document.createElement('p');
        const numberOfLike = document.createElement('p');
        const info = document.createElement('div');
        const heart= document.createElement('i');
        let media =document.createElement('p');
        if(image!== undefined){
            media = document.createElement( 'img' );
        } else if(video!== undefined){
            media = document.createElement( 'video' );
            let videoLink = mediaLink.slice(0,mediaLink.length-3)
            videoLink +=`png`;
            media.setAttribute("poster", videoLink );
            //media.setAttribute("controls",''); //Permet le controle de la vidéo par l'utilisateur
        }else{
            media.textContent = `Image/Video introuvable`;
        }
        media.setAttribute("class",'media-grid')
        media.setAttribute("src", mediaLink);
        media.setAttribute("alt", title);
        media.setAttribute("data-media-id",id);
        media.setAttribute("tabindex",0)
        media.setAttribute("aria-label",`Titre: ${title}, ${likes} personnes aiment ce média`)
        media.setAttribute("role","img")
        
        media.addEventListener('click',()=>{
            showLightbox(id)
        })
        media.addEventListener('keydown',event =>{
            if(event.key==='Enter'){
                showLightbox(id)
            }
        })


        link.appendChild(media);

        mediaName.textContent = title;
        //let heartTrigger = false
        numberOfLike.textContent = likes;
        numberOfLike.setAttribute("class",'number-of-likes')
        heart.setAttribute("class",'fa-solid fa-heart')
        heart.setAttribute("aria-label",'Ajouter un likes')
        heart.setAttribute("tabindex",0)
        heart.setAttribute("role","button")

        // permet d'incrementer ou décrementer le nombre de likes associé au coeur
        heart.addEventListener('click',()=>{
            let heartTrigger = JSON.parse(localStorage.getItem(id))
            console.log(heartTrigger.trigger);
            if(heartTrigger.trigger === true){
                numberOfLike.textContent --
                heartTrigger.trigger = false
                let returnValue = { trigger : false}
                let returnValueStringify = JSON.stringify(returnValue)
                localStorage.setItem(id, returnValueStringify)
                modifyLike(id,'DEC')
                getLikes()
            } else {
                numberOfLike.textContent ++
                heartTrigger.trigger = true
                let returnValue = { trigger : true}
                let returnValueStringify = JSON.stringify(returnValue)
                localStorage.setItem(id, returnValueStringify)
                modifyLike(id,'INC')
                getLikes()
                
            }
        })

        heart.addEventListener('keydown',(e)=>{
            let heartTrigger = JSON.parse(localStorage.getItem(id))
            console.log(heartTrigger.trigger);
            if(e.key ==='Enter'){
                if(heartTrigger.trigger === true){
                    numberOfLike.textContent --
                    heartTrigger.trigger = false
                    let returnValue = { trigger : false}
                    let returnValueStringify = JSON.stringify(returnValue)
                    localStorage.setItem(id, returnValueStringify)
                    modifyLike(id,'DEC')
                    getLikes()
                } else {
                    numberOfLike.textContent ++
                    heartTrigger.trigger = true
                    let returnValue = { trigger : true}
                    let returnValueStringify = JSON.stringify(returnValue)
                    localStorage.setItem(id, returnValueStringify)
                    modifyLike(id,'INC')
                    getLikes()
                    
                }
            } 
        })

        info.appendChild(mediaName)
        info.appendChild(numberOfLike)
        info.appendChild(heart)


        article.appendChild(link)
        article.appendChild(info)
        return (article);
    }

    return { id, photographerId, title, image, video, likes, date, price, getUserMediaDOM,  }
}