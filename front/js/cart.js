// Récupérer les données du local storage
const cart = []

retrieveItemsFromCache()
cart.forEach((item) => displayItem(item))

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

//On récupère le nombre d'articles depuis le local storage
function retrieveItemsFromCache() {
    const numberOfItems = localStorage.length
    for(let i = 0; i < numberOfItems; i++){
        const item = localStorage.getItem(localStorage.key(i)) || ""
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}

// Afficher l'article
function displayItem(item) {
    const article = makeArticle(item)
    const imageDiv = makeImageDiv(item)
    article.appendChild(imageDiv)

    const cardItemContent = loadCartContent(item)
    article.appendChild(cardItemContent)
    displayArticle(article)
    displayTotalQuantity()
    displayTotalPrice()
}


// Afficher le nombre d'articles
function displayTotalQuantity() {
    const totalQuantity = document.getElementById("totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
}


// Afficher le prix total des articles
function displayTotalPrice() {
    let total = 0
    const totalPrice = document.getElementById("totalPrice")

    cart.forEach((item) => {
        const totalUnitPrice = item.price * item.quantity
        total += totalUnitPrice
    })
    totalPrice.textContent = total
}

// Afficher le contenu des articles dans le panier
function loadCartContent(item) {
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")

    const description = loadDescription(item)
    const settings = loadSettings(item)

    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
}

// Afficher les paramètres quantité et valeur du ou des articles
function loadSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}

// Bouton supprimer du panier des articles
function addDeleteToSettings(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))

    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

// Fonction supprimer du panier
function deleteItem(item) {
    const itemToDelete = cart.findIndex(product => product.id === item.id && product.color === item.color)
    cart.splice(itemToDelete, 1)
    displayTotalPrice()
    displayTotalQuantity()
    deleteDataFromCache(item)
    deleteArticlefromPage(item)
}

// ON supprime l'article de la page
function deleteArticlefromPage(item) {
    const articleToDelete = document.querySelector(
        `article[data-id="${item.id}"][data-color="${item.color}"]`
    )
    articleToDelete.remove()
}

// Rajouter une quantité d'articles depuis le panier
function addQuantityToSettings(settings, item) {
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent = "Qté : "
    quantity.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))

    quantity.appendChild(input)
    settings.appendChild(quantity)
}

// Changer la quantité via un clic
function updatePriceAndQuantity(id, newValue, item) {
    const itemToUpdate = cart.find(item => item.id === id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    displayTotalQuantity()
    displayTotalPrice()
    saveNewDataToCache(item)
}

// Retirer les données des articles du cache
function deleteDataFromCache(item) {
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}

// Le local storage doit stocker les changements de quantité depuis le panier
function saveNewDataToCache(item) {
    const dataToSave = JSON.stringify(item)
    const key = `${item.id}-${item.color}`
    localStorage.setItem(item.id, dataToSave)
}


// Afficher la description, nom du produit, couleur et prix
function loadDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color
    const p2 = document.createElement("p")
    p2.textContent = item.price + " €"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

// Afficher l'article
function makeArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

// Afficher l'image des articles
function makeImageDiv(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altText
    div.appendChild(image)
    return div
}


// Soumettre le formulaire
function submitForm(e) {
    e.preventDefault()
    if (cart.length === 0) {
        alert("Please select at least an item to buy")
        return
    }

    if (isFormValid()) return
    if (isEmailValid()) return
    
    const body = loadRequestBody()
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type" : "application/json"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            const orderId = data.orderId
            window.location.href = "/front/html/confirmation.html" + "?orderId=" + orderId
        })
        .catch((err) => console.error(err))
}

// Vérifier la validité de l'email
function isEmailValid() {
    const email = document.getElementById("email").value

    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
    if (regex.test(email) === false) {
        alert("Please enter valid email")
        return true
    }
    return false
}

// Vérifier la validité du formulaire
function isFormValid() {
    const form = document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input")
    inputs.forEach((input) => {
        if (input.value === "") {
            alert("Please fill all the fields")
            return true
        }
        return false
    })
}

//On révupère les éléments depuis l'API
function loadRequestBody() {
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
    const body = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        products: getIdsFromCache()
    }
    return body
}

// On récupère le nombre de produit depuis le local storage
function getIdsFromCache() {
    const numberOfProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfProducts; i++) {
        const key = localStorage.key(i)
        const id = key.split("-")[0]
        ids.push(id)
    }
    return ids
}