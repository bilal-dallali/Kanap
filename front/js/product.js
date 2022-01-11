const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")

fetch(`http://localhost:3000/api/products/${id}`)
.then((response) => response.json())
.then((res) => handleData(res))

function handleData(couch) {
    console.log({couch})
    const { altTxt, colors, description, imageUrl, name, price, _id } = couch
    loadImage(imageUrl, altTxt)
    loadTitle(name)
    loadPrice(price)
    loadDescription(description)
    loadColors(colors)
}

//Afficher l'image
function loadImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item_img")
    if (parent != null) parent.appendChild(image)
    console.log(parent)
    console.log(altTxt)
    console.log(imageUrl)
}

//Afficher le titre
function loadTitle(name) {
    const h1 = document.querySelector('#title')
    if (h1 != null) h1.textContent = name
}

//Afficher le prix
function loadPrice(price) {
    const span = document.querySelector("#price")
    if (span != null) span.textContent = price
}

//Afficher la description
function loadDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

//Afficher le choix des couleurs
function loadColors(colors) {
    const select = document.querySelector("#colors")
    if (select != null) {
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
        })
    }
}
