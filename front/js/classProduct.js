let urlcourante = window.location.href; 
let url = new URL(urlcourante); 
let kanap_id = url.searchParams.get("id");

function showToDOM(where, what) { // affichage des éléments du produit
    document.getElementById(where).innerHTML = what
}

function saveCart(product) { //fonction de sauvegarde du "product" dans le localstorage
    localStorage.setItem("product", JSON.stringify(product))
}

function addAndSave(product, produit) { //fonction ajout nouveau et sauvegarde du product
    product.push(produit) // ajout du produit
    saveCart(product) //appel de la fonction de sauvegarde du "product" dans le localstorage
}

function getValue(option) { // fonction de récupération des options/quantité selectionnées
    return document.getElementById(option).value
}


//appel API 
let kanap = fetch("http://localhost:3000/api/products");
kanap.then((response) => { 
    let kanapprom = response.json();
    kanapprom.then((kanaptabs) => { // reponse = tableau à boucler pour récupérer les caracteristiques des canapé //
        for (let k = 0; k < kanaptabs.length; k++) {
             
            if (kanap_id == kanaptabs[k]['_id']) { // On recherche dans l Id(Url)  quel kanap affiché//
                //creation d'objet produit ayant pour parametres les caracteristiques du canapé
                let produit = new Object()
                produit.id = kanaptabs[k]['_id']
                produit.colors = kanaptabs[k]['colors']

                let prod  = new Object()
                prod.imageUrl = kanaptabs[k]['imageUrl']
                prod.alttxt = kanaptabs[k]['altTxt']
                prod.name = kanaptabs[k]['name']
                prod.description = kanaptabs[k]['description']
                prod.price = kanaptabs[k]['price']

                    //ajout du code HTML commenté en ajoutant les parametres propre a chaque produit
                document.getElementsByTagName('title')[0].innerHTML = prod.name
                showToDOM('title', prod.name)
                showToDOM('price', prod.price)
                showToDOM('description', prod.description)
                document.getElementsByClassName('item__img')[0].innerHTML = '<img src="' + prod.imageUrl + '" alt="' + prod.alttxt + '">'
                produit.colors.forEach(color => {
                    document.getElementById('colors').innerHTML += '<option value="' + color + '">' + color + '</option>';
                });

                const button = document.getElementById('addToCart');
                
                button.addEventListener('click', function() {
                    const quantity = parseInt(getValue("quantity")); 
                    const selectedcolor = getValue('colors'); 
                    let product = JSON.parse(localStorage.getItem("product")); 
                
                    
                    if (quantity < 0) { // verification que la quantité soit un nombre  positif sinon alerte et reset a 0
                        alert("La quantité doit être supérieur a zéro")
                        document.getElementById("quantity").value = 0
                    } else { //création de l'objet à rajouter au product
                        let article = {
                            kanap_id,
                            name: produit.name,
                            img: produit.imageUrl,
                            quantity,
                            price: produit.price,
                            selectedcolor,
                            alt: produit.alttxt,
                        }
                        if (quantity == 0) { // vérification quantité différente de zéro
                            alert("Veuillez choisir la quantité")
                        } else if (selectedcolor == '') { 
                            alert("Veuillez choisir une couleur")
                        } else { //vérifie si le product contient deja des produits
                            alert('Votre produit a été ajouté!')
                            if (product) { 
                                for (let p = 0; p < product.length; p++) { 
                                    if ((product[p]['name'] == article.name) &&
                                        (product[p]['selectedcolor'] == article.selectedcolor)) { //pour chercher si une correspondance nom/couleur existe deja
                                        return [
                                            (product[p]['quantity']) += article.quantity, // si oui on ajoute la quantité voulu
                                            saveCart(product) //appel de la fonction de sauvegarde du "product" dans le localstorage
                                        ]
                                    }
                                }
                                addAndSave(product, article) //fonction ajout nouveau produit et sauvegarde du product
                            } else {
                                
                                let product = [] // création du product
                                addAndSave(product, article) 
                            }
                        }
                    }
                });
            }
        }
    })
}).catch(() => {
    document.getElementById('items').innerHTML = 'Désolé un problème est survenu pendant le chargement de la page';
    console.log('Problème API');
});