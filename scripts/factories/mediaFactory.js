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
        media.addEventListener('click',()=>{
            showLightbox(id)
            console.log("Media click");
        })

        link.appendChild(media);

        mediaName.textContent = title;
        let heartTrigger = false
        numberOfLike.textContent = likes;
        numberOfLike.setAttribute("class",'number-of-likes')
        heart.setAttribute("class",'fa-solid fa-heart')
        heart.setAttribute("aria-label",'likes')
        heart.setAttribute("tabindex",0)

        // permet d'incrementer ou décrementer le nombre de likes associé au coeur
        heart.addEventListener('click',()=>{
            if(heartTrigger){
                numberOfLike.textContent --
                heartTrigger = false
                modifyLike(id,'DEC')
                getLikes()
            } else {
                numberOfLike.textContent ++
                heartTrigger = true
                modifyLike(id,'INC')
                getLikes()
                
            }
        })

        heart.addEventListener('keydown',(e)=>{
            if(heartTrigger && e.key ==='Enter'){
                numberOfLike.textContent --
                heartTrigger = false
                modifyLike(id,'DEC')
                getLikes()
            } else if(e.key ==='Enter'){
                numberOfLike.textContent ++
                heartTrigger = true
                modifyLike(id,'INC')
                getLikes()
                
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