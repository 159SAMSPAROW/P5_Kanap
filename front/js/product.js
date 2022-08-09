//recup url api par id
const urlParam = (new URL(location)).searchParams;
const productId = urlParam.get("id");
console.log(productId);

function saveCart(product) { //fonction de sauvegarde du "product" dans le localstorage
    localStorage.setItem("product", JSON.stringify(product))
}

function addAndSave(localStorageContent, productOptions) { //fonction ajout nouveau et sauvegarde du product
    localStorageContent.push(productOptions) // ajout du produit
    saveCart(localStorageContent) //appel de la fonction de sauvegarde du "product" dans le localstorage
}

function getValue(option) { // fonction de récupération des options/quantité selectionnées
    return document.getElementById(option).value
}


//decla variable pour pouvoir faire l' injection dans le html
const imgKanap = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");


//recup produit par id
const kanapId = fetch(`http://localhost:3000/api/products/${productId}`);

//promise asynchrone qui répond par un fichier json si la reponse est positive
kanapId.then(async(res) => {

    if (res.ok) {
        await res.json()

        .then((product) => {
                imgKanap.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
                title.innerHTML = `${product.name}`;
                price.innerHTML = `${product.price}`;
                description.innerHTML = `${product.description}`;

                //injetion des couleurs de produit dans constante sur lequel on fait une boucle
                const colorArray = product.colors

                //boucle qui récupère le choix des couleurs dans le tableau
                for (let color of colorArray) {

                    /*injection des valeur d' option (couleur) dans l' element select html 
                    qui fournit une liste d 'options parmi lesquelles l'
                    utilisateur pourra choisir.*/
                    colors.innerHTML += `<option value =${color}>${color}</option>`
                }
            })
            //imprime dans la console un message d' erreur si la réponse de la promesse est négative
            .catch((err) => {
                console.log(err);
            })
    }
});

const btnAdd = document.querySelector("#addToCart"); //on met le button id dans la constante btnAdd

btnAdd.addEventListener('click', () => { //ecoute événement click sur btnAdd

let localStorageContent = JSON.parse(localStorage.getItem("product")); //convertit en java script

    const quantity = parseInt(getValue("quantity")); 
    const selectedcolor = getValue('colors'); 
                    //let product = JSON.parse(localStorage.getItem("product")); 

    if (quantity < 0 && quantity < 100) { //condition si la valeur est compris entre 0 ET 100         
        alert("La quantité doit être supérieur a zéro")
    
    }else{
        
        var productOptions = { //recupere le contenu des variables des details du produit
            id: productId,
            color: colors.value,
            quantity: quantity,
        
        } 
    }             
        if (quantity == 0) {            
            
            alert("Veuillez choisir la quantité")
        
        } else if (selectedcolor == '') { 
            
            alert("Veuillez choisir une couleur")
        }
         else { //vérifie si le product contient deja des produits
            
            alert('Votre produit a été ajouté!')
            
            if(localStorageContent){
            
                localStorageContent.forEach((kanap) => 
                {
                    if ((kanap.id === productOptions.id) &&
                        (kanap.color === productOptions.color)) { //pour chercher si une correspondance nom/couleur existe deja
                        
                            return [
                            (kanap.quantity) += productOptions.quantity, // si oui on ajoute la quantité voulu
                            saveCart(localStorageContent) //appel de la fonction de sauvegarde du "product" dans le localstorage
                            ]
                        }

                        addAndSave(localStorageContent, productOptions)               
                })

            }else{
                localStorageContent = [];
                addAndSave(localStorageContent, productOptions)
            }
        }
          //window.location.href ="cart.html"
})
    

