const orderId = getOrderId()
displayOrderId(orderId)
deleteAllCache()

function getOrderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
    return orderId
}


function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

function deleteAllCache() {
    const cache = window.localStorage
    cache.clear()
}
