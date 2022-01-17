// Récupérer les données du local storage
//console.log(numberOfArticles)
const cart = []

retrieveItemsFromCache()
cart.forEach((item) => displayItem(item))
//console.log(cart)

// altText: "Photo d'un canapé bleu, deux places"
// color: "Black"
// id: "107fb5b75607497b96722bda5b504926"
// imageUrl: "http://localhost:3000/images/kanap01.jpeg"
// price: 1849
// quantity: 3

function retrieveItemsFromCache() {
    const numberOfItems = localStorage.length
    for(let i = 0; i < numberOfItems; i++){
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}

function displayItem(item) {
    const article = makeArticle(item)
    displayArticle(article)
    console.log(article)
    const div = makeImageDiv(item)
    article.appendChild(div)
}

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

function makeArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

function makeImageDiv(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}