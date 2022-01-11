// On intègre l'api grâce à la méthode fetch
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => {
        //console.log(data)
        return addProducts(data)
    })

// On récupère les données
// On récupère l'image URL du premier article
function addProducts(data) {

    // On affiche les autres articles / canapés
    data.forEach((couch) => {
        //console.log("couch number : ", couch)

        const {_id, imageUrl, altTxt, name, price, description} = couch
        const anchor = makeAnchor(_id)
        const article = document.createElement("article")
        const image = loadImage(imageUrl, altTxt)
        const h3 = loadH3(name)
        const p = loadParagraph(description)

        appendElementToArticle(article, image, h3, p)
        appendArticleToAnchor(anchor, article)
    })
}

function appendElementToArticle(article, image, h3, p) {
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
}

//On créé le lien vers la page product depuis le produit de l'API
function makeAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}

// On insère l'image du canapé depuis l'API
function appendArticleToAnchor(anchor, article) {
    const items = document.querySelector('#items');
    if (items != null) {
        items.appendChild(anchor)
        anchor.appendChild(article)
        //console.log("object added to items", items)
    }
}

// On affiche l'image depuis l'API
function loadImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}


// Titre de l'article
function loadH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")//On ajoute une classe au h3
    return h3
}

//Paragraphe de notre article
function loadParagraph(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}