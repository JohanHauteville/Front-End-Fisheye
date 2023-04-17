import modifyLike from '../utils/filterBy.js'
import { getLikes } from '../pages/photographer.js'
import { showLightbox } from '../utils/lightBox.js'

// CREER L'ARTICLE MEDIA ET LE RETOURNE
export function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;
    const mediaLink = `assets/medias/${photographerId}/${image ?? video}`;

    function getUserMediaDOM() {
        const article = document.createElement('article');
        const link = document.createElement('a');
        link.setAttribute("class", 'media-link')

        const mediaName = document.createElement('p');
        const numberOfLike = document.createElement('p');
        const info = document.createElement('div');
        const heart = document.createElement('i');
        let media = document.createElement('p');
        // controle la présence d'un image puis d'une video dans le JSON
        if (image !== undefined) {
            media = document.createElement('img');
        } else if (video !== undefined) {
            media = document.createElement('video');
            let videoLink = mediaLink.slice(0, mediaLink.length - 3)
            videoLink += `png`;
            media.setAttribute("poster", videoLink);
        } else {
            media.textContent = `Image/Video introuvable`;
        }
        media.setAttribute("class", 'media-grid')
        media.setAttribute("src", mediaLink);
        media.setAttribute("alt", title);
        media.setAttribute("data-media-id", id);
        media.setAttribute("tabindex", 0)
        media.setAttribute("aria-label", `Titre: ${title}, ${likes} personnes aiment ce média`)
        media.setAttribute("role", "img")

        //Affiche la LigthBox en fonction d'un click ou de la touche 'Enter'
        media.addEventListener('click', () => {
            showLightbox(id)
        })
        media.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                showLightbox(id)
            }
        })

        link.appendChild(media);

        mediaName.textContent = title;

        numberOfLike.textContent = likes;
        numberOfLike.setAttribute("class", 'number-of-likes')

        heart.setAttribute("class", 'fa-solid fa-heart')
        heart.setAttribute("aria-label", 'Ajouter un likes')
        heart.setAttribute("tabindex", 0)
        heart.setAttribute("role", "button")

        // permet d'incrementer ou décrementer le nombre de likes associé au coeur
        heart.addEventListener('click', () => {
            //on récupère la donnée heartTrigger qui indique si le coeur à déjà été ajouté
            let heartTrigger = JSON.parse(localStorage.getItem(id))

            if (heartTrigger.trigger === true) {
                numberOfLike.textContent--
                heartTrigger.trigger = false
                //on met à jour la valeur du trigger dans le LocalStorage
                let returnValue = { trigger: false }
                let returnValueStringify = JSON.stringify(returnValue)
                localStorage.setItem(id, returnValueStringify)
                //on décremente le nombre de likes
                modifyLike(id, 'DEC')
                //on met à jour le nombre total de likes
                getLikes()
            } else {
                numberOfLike.textContent++
                heartTrigger.trigger = true
                //on met à jour la valeur du trigger dans le LocalStorage
                let returnValue = { trigger: true }
                let returnValueStringify = JSON.stringify(returnValue)
                localStorage.setItem(id, returnValueStringify)
                //on incremente le nombre de likes
                modifyLike(id, 'INC')
                //on met à jour le nombre total de likes
                getLikes()
            }
        })
        // même chose mais avec le clavier
        heart.addEventListener('keydown', (e) => {
            let heartTrigger = JSON.parse(localStorage.getItem(id))
            if (e.key === 'Enter') {
                if (heartTrigger.trigger === true) {
                    numberOfLike.textContent--
                    heartTrigger.trigger = false
                    let returnValue = { trigger: false }
                    let returnValueStringify = JSON.stringify(returnValue)
                    localStorage.setItem(id, returnValueStringify)
                    modifyLike(id, 'DEC')
                    getLikes()
                } else {
                    numberOfLike.textContent++
                    heartTrigger.trigger = true
                    let returnValue = { trigger: true }
                    let returnValueStringify = JSON.stringify(returnValue)
                    localStorage.setItem(id, returnValueStringify)
                    modifyLike(id, 'INC')
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

    return { id, photographerId, title, image, video, likes, date, price, getUserMediaDOM, }
}