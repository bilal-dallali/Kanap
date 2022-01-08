// On intègre l'api grâce à la méthode fetch
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        return addProducts(data)
    })

// On récupère les données
// On récupère l'image URL du premier article
function addProducts(datas) {
    const id = datas[0]._id
    const imageUrl = datas[0].imageUrl
    const altTxt = datas[0].altTxt
    const name = datas[0].name
    const description = datas[0].description
    //console.log(name)

    const image = makeImage(imageUrl, altTxt)
    const anchor = makeAnchor(id)
    const article = makeArticle()
    const h3 = makeH3(name)
    const p = makeParagraph(description)

    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
    appendChildren(anchor, article)
}

//On créé le lien vers la page product depuis le produit de l'API
function makeAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}

// On insère l'image du canapé depuis l'API
function appendChildren(anchor, article) {
    const items = document.querySelector('#items');
    if (items != null) {
        items.appendChild(anchor)
        anchor.appendChild(article)
        //console.log("object added to items", items)
    }
}

// On affiche l'image depuis l'API
function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

//On affiche la balise de l'article contenant l'image, le titre h3 et le paragraphe
function makeArticle() {
    const article = document.createElement("article")
    //const image = makeImage()
    //const p = makeParagraph()
    //console.log(article)
    return article
}

function makeH3(name) {
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")//On ajoute une classe au h3
    return h3
}

function makeParagraph(description) {
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}