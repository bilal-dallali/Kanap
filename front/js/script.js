// On intègre l'api grâce à la méthode fetch
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => addProducts(data))

// On ajoute les produits à notre page d'accueil
function addProducts(datas) {
    //console.log(datas);
    const imageUrl = datas[0].imageUrl
    //console.log("url de l'image", imageUrl)

    const anchor = document.createElement("a");
    anchor.href = "http://localhost:3000/images/kanap01.jpeg"
    anchor.text = "OUr first couch"
    const items = document.querySelector('#items');
    if (items != null) {
        items.appendChild(anchor)
        //console.log("It works")
    }
}