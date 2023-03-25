export function photographerFactory(data) {
    
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        const img = document.createElement( 'img' );
        const info = document.createElement('div');
        info.classList.add('info_photographers');
        const infoLocation = document.createElement('p');
        const infoTagLine = document.createElement('p');
        const infoPrice = document.createElement('p');


        link.setAttribute("href",`photographer.html?id=${id}`);
        link.setAttribute("aria-label",`Profil de ${name}`)
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.setAttribute("aria-hidden",true);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        link.appendChild(img);
        link.appendChild(h2);

        infoLocation.textContent = `${city}, ${country}`
        infoLocation.setAttribute("aria-label",`Localisation: ${city}, ${country}`)
        infoLocation.setAttribute("tabindex",0);

        infoTagLine.textContent = tagline
        infoTagLine.setAttribute("aria-label",`Citation: ${tagline}`)
        infoTagLine.setAttribute("tabindex",0);
        
        infoPrice.textContent = `${price}€/jour`
        infoPrice.setAttribute("aria-label",`Prix: ${price} euros par jour`)
        infoPrice.setAttribute("tabindex",0);

        info.appendChild(infoLocation)
        info.appendChild(infoTagLine)
        info.appendChild(infoPrice)

        article.appendChild(link)
        article.appendChild(info)
        return (article);
    }
    function getUserProfileDOM() {
        const section = document.createElement('section')
        const infos = document.createElement('div')
        const infoName= document.createElement('h1')
        const infoLocalisation = document.createElement('p')
        const infoCitation = document.createElement('p')
        // Permet d'afficher le nom du photographe dans le header du formulaire
        let formHeader = document.querySelector('h2')
        formHeader.innerText += `\n${name}`;

        const image = document.createElement('img')
        section.setAttribute("class",'photographer-profile')
        

        infoName.textContent = name;
        infoLocalisation.textContent = `${city}, ${country}`;
        infoLocalisation.setAttribute("class",'info-localisation')
        infoCitation.setAttribute("aria-label",'Localisation');
        infoCitation.textContent = tagline;
        infoCitation.setAttribute("class",'info-citation');
        infoCitation.setAttribute("aria-label",'Citation');

        image.setAttribute("src", picture);
        image.setAttribute("alt", name);
        image.setAttribute("aria-hidden",true);

        infos.appendChild(infoName)
        infos.appendChild(infoLocalisation)
        infos.appendChild(infoCitation)

        section.appendChild(infos);
        section.appendChild(image);
        

        return(section)
    }
    function getPriceDOM() {
        const priceDisplay = document.createElement('p')
        const popLikes = document.createElement('p')
        const pop = document.createElement('div')

        popLikes.setAttribute("class",'pop-likes')
        priceDisplay.textContent = `${price}€ / jour`
        priceDisplay.setAttribute("class",'pop-price')
        pop.appendChild(popLikes)
        pop.setAttribute("class",'pop-up')
        pop.appendChild(priceDisplay)

        return(pop)

    }

    return { name, id, city, country, tagline, price, picture, getUserCardDOM, getUserProfileDOM, getPriceDOM }
}