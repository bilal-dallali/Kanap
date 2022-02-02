const orderId = getOrderId()
displayOrderId(orderId)
deleteAllCache()

//On récupère l'id de confirmation
function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
    return orderId
}

// On affiche l'id sur le page
function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

// On efface les données des articles du local storage pour effacer le panier
function deleteAllCache() {
    const cache = window.localStorage
    cache.clear()
}
