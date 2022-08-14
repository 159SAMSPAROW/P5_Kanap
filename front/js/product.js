
let url = window.location.search;// On récupère l' url de la page
const urlSearchParams = new URLSearchParams(url);// Création d' un object pour rechercher l' id
const kanap_id = urlSearchParams.get("id");// Récupération de l' id


function showToDOM(where, what) { // Fonction d' affichage des éléments du produit
    document.getElementById(where).innerHTML = what; 
}

function saveCart(product) { //fonction de sauvegarde de "product" dans le localstorage
    localStorage.setItem("product", JSON.stringify(product));// On envoi au localStorage dans la clé product, les données convertit en string 
}

function addAndSave(product, produit) { //fonction ajout nouveau et sauvegarde du product
    product.push(produit) // On injecte un produit dans un tableau
    saveCart(product) //appel de la fonction de sauvegarde du "product" dans le localstorage
}

function getValue(option) { // fonction de récupération des options/quantité selectionnées
    return document.getElementById(option).value// Retourne en dehors de la fonction la valeur du paramètre
}


//appel API 
let kanap = fetch("http://localhost:3000/api/products");

kanap.then( function (response, err)  { 

    let kanapprom = response.json();

     kanapprom.then(function(kanaptabs) { // Si reponse on récupère les infos de l' api dans kanatabs 

        for (let k = 0; k < kanaptabs.length; k++) {// On boucle sur tous les éléments
             
            if (kanap_id == kanaptabs[k]['_id']) { // On recherche dans l Id (Url)  quel kanap affiché
                
                //On créer un objet produit ayant pour paramètres les caracteristiques du kanap que l' on enverra au localStorage
                let produit = new Object()
                produit.id = kanaptabs[k]['_id']
                produit.colors = kanaptabs[k]['colors']

                //On créer un deuxième objet pour séparer les caractéristique que l' on enverra pas au localStorage, pour pouvoir les injecter dans le html
                let prod  = new Object()
                prod.imageUrl = kanaptabs[k]['imageUrl']
                prod.alttxt = kanaptabs[k]['altTxt']
                prod.name = kanaptabs[k]['name']
                prod.description = kanaptabs[k]['description']
                prod.price = kanaptabs[k]['price']

               document.getElementsByTagName('title').innerHTML = prod.name// On sélectionne l' id title pour y injecter le nom du produit
               
                showToDOM('title', prod.name)// On affiche dans l' id title(html) la valeur de la clé name de l' objet prod  
                showToDOM('price', prod.price)// On affiche dans l' id price(html) la valeur de la clé price de l' objet prod
                showToDOM('description', prod.description)// On affiche dans l' id description(html) la valeur de la clé description de l' objet prod
                
                //On injecte par concaténation dans la div item__img les valeurs des clées imageUrl et altTxt de l' objet prod 
                
                // La getElementsByClassName()méthode renvoie une HTMLCollection .
                //Une HTMLCollection est une collection de type tableau (liste) d'éléments HTML.
                //Les éléments d'une collection sont accessibles par index (commence à 0).
                document.getElementsByClassName('item__img')[0].innerHTML = '<img src="' + prod.imageUrl + '" alt="' + prod.alttxt + '">'
                
                produit.colors.forEach(color => {// On boucle sur la clé colors  de l' objet produit
                    document.getElementById('colors').innerHTML += '<option value="' + color + '">' + color + '</option>';// On injecte dans colors les options color
                                                                                      // + les valeurs en texte dans les options du controle select
                })

                const button = document.getElementById('addToCart');// On sélectionne le bouton addTocart                
                button.addEventListener('click', function() {// On écoute l' événement click 
                    
                    const quantity = parseInt(getValue("quantity")); // On récupère la valeur en nombre entier 
                    const selectedcolor = getValue('colors'); //On récupère la couleur sélectionner 
                    let product = JSON.parse(localStorage.getItem("product"));//On récupère le localStorage 
                                   
                    if (quantity < 0) { // On vérifie que la quantité soit un nombre  positif sinon alerte et reset a 0
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
                        } else { 
                            alert('Votre produit a été ajouté!')  
                            if (product) { //vérifie si le product contient deja des produits     
                                for (let p = 0; p < product.length; p++) { //On boucle sur le tableau product     
                                    if ((product[p]['kanap_id'] == article.kanap_id) &&
                                        (product[p]['selectedcolor'] == article.selectedcolor)) { // Si une correspondance nom/couleur existe deja
                                            return [
                                            (product[p]['quantity']) += article.quantity, // si oui on ajoute la quantité voulu
                                            saveCart(product) //appel de la fonction de sauvegarde du product dans le localstorage
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
}).catch(function(err) {// Si il y a un problème sur la réponse de la promise 
    
    alert('Une erreur est survenu pendant le chargement de la page') ;// On affiche une alerte js
    console.log('Problème API');
})