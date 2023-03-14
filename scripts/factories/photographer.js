export function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    console.log(data)

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


        link.setAttribute("href",'#');
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
    return { name, id, city, country, tagline, price, picture, getUserCardDOM }
    

}