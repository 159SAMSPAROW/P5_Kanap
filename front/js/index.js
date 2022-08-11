//apel api
const kanap = fetch("http://localhost:3000/api/products");


kanap.then(async function(res, err) {// Alors on récupère de facon asynchrone  

        if (res.ok) {// Si il y a une réponse 
           
            await res.json()// On demande une réponse convertit en objet javaScript

            
            .then(function(products){// Alors paramètre le contenu de la réponse dans products
                                 

                for (let product of products) {// On boucle pour un produit contenu dans products

                    items.innerHTML += // On injecte dans le html  chaque produit de manière dynamique
                        `<a href="./product.html?id=${product._id}">
                    <article>
                        <img src="${product.imageUrl}" alt="${product.altTxt}">
                        <h3 class="productName">${product.name}</h3>
                        <p class="productDescription">${product.description}</p>
                        <p class="price"> ${product.price}€</p>
                    </article>
                    </a>`
                }
            }).catch(function(err)  {
                items.innerHTML =" <h2>Erreur de chargement de la page</h2>";
            })
        }
    })
 
    
    
    