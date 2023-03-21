export function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;
    const mediaLink = `assets/medias/${photographerId}/${image??video}`;

    function getUserMediaDOM() {
        
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        
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
            media.setAttribute("controls",''); //Permet le controle de la vidéo par l'utilisateur
        }else{
            media.textContent = `Image/Video introuvable`;
        }
        media.setAttribute("src", mediaLink);
        media.setAttribute("alt", title);
        media.setAttribute("tabindex",0)
        media.setAttribute("aria-label",`Titre: ${title}, ${likes} personnes aiment ce média`)

        link.appendChild(media);

        mediaName.textContent = title;
        numberOfLike.textContent = likes;
        heart.setAttribute("class",'fa-solid fa-heart')
        heart.setAttribute("aria-label",'likes')

        info.appendChild(mediaName)
        info.appendChild(numberOfLike)
        info.appendChild(heart)


        article.appendChild(link)
        article.appendChild(info)
        return (article);
    }
    return { id, photographerId, title, image, video, likes, date, price, getUserMediaDOM }
}