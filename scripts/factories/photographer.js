export function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    console.log(data)

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const info = document.createElement('div');
        info.classList.add('info_photographers')
        const infolocation = document.createElement('p')
        const infoTagline = document.createElement('p')
        const infoPrice = document.createElement('p')

        img.setAttribute("src", picture)
        img.setAttribute("alt", name)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);

        infolocation.textContent = `${city}, ${country}`
        infoTagline.textContent = tagline
        infoPrice.textContent = `${price}€/jour`

        info.appendChild(infolocation)
        info.appendChild(infoTagline)
        info.appendChild(infoPrice)

        article.appendChild(info)
        return (article);
    }
    return { name, id, city, country, tagline, price, picture, getUserCardDOM }
    

}