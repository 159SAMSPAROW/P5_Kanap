//apel api
const kanap = fetch("http://localhost:3000/api/products");

//si l' api repond elle retourne un fichier json
kanap.then(async(res, err) => {

        if (res.ok) {
            await res.json()

            //alors ont veut que pour chaque produit soit injecter l'id, l' image et son txt alt, le nom et la description du produit dans l' id items du html
            .then((products) => {

                for (let product of products) {

                    items.innerHTML +=
                        `<a href="./product.html?id=${product._id}">
                    <article>
                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                        <h3 class="productName">${product.name}</h3>
                        <p class="productDescription">${product.description}</p>
                        <p class="price"> ${product.price}€</p>
                    </article>
                    </a>`

                }
            })

            // si il y a une erreur dans les produits injecte une erreur dans le html
            .catch((err) => {
                items.innerHTML =" <h2>erreur de chargement de la page</h2>";
            })
        }

    })
    //si l' api ne repond pas on renvoie une alert js
    .catch((err) => {
        alert("erreur de chargement")
    });