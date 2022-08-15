//Récupération du localStorage 

let productFromLS = JSON.parse(localStorage.getItem("product"));// Les éléments du localStorage sont récupérées

function saveProductLS(product) {// fonction qui envoi vers le localStorage
    return localStorage.setItem("product", JSON.stringify(productFromLS));
  }
  
function getValue(option) { // fonction de récupération des options/quantitées selectionnées
    return document.getElementsByClassName(option).value
}

function deleteItem(id, color)  {// Fonction pour supprimer le produit avec l'id et la couleur correspondante
    
    productFromLS = productFromLS.filter(kanap => {               //La méthode filter() crée et retourne un nouveau tableau 
        if(kanap.kanap_id == id && kanap.selectedcolor == color){ //contenant tous les éléments du tableau d'origine qui 
            return false;                                         //remplissent une condition déterminée par la fonction callback.
        }else{return true;} 
    });

    saveProductLS(productFromLS);
};

// Condition pour l'ensemble du panier
if (productFromLS === null || productFromLS == 0) {// On verifie si le localStorage existe et si il n' est pas vide
    document.getElementById("cart__items").innerHTML = '<h2>Votre panier  est vide</h2>'// On injecte un h2 dans cart__items(html)
}else{// sinon
    productFromLS.forEach((kanap) => {// On boucle sur chaque (kanap)
        // Apel API pour récupérer les données qui ne sont pas stockées dans le localStorage,    
        fetch("http://localhost:3000/api/products/" + `${kanap.kanap_id}`)// En ajoutant l' id pour recherche précise
        
        .then( response => response.json())// Alors on veut convertir la réponse au format json (objet javascript)           
            .then(function(productDetail){// Alors on récupère les infos dans productDetail
            
            document.getElementById("cart__items").innerHTML += // Ajout des produits dans la page panier (html a la volée)
            
            `<article class="cart__item" data-id="${kanap.kanap_id}" data-color="${kanap.selectedcolor}">
                    <div class="cart__item__img">
                        <img src="${productDetail.imageUrl}" alt="${productDetail.altTxt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                        <h2>${productDetail.name}</h2>
                        <p>${kanap.selectedcolor}</p>
                        <p id="priceProduct">${productDetail.price} €</p>
                        </div>
                        <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${kanap.quantity}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                        </div>
                    </div>
                </article>`


                // Sélection des boutons supprimer
                document.querySelectorAll(".deleteItem").forEach(button => {// On boucle sur chaque bouton deleteItem                
                button.addEventListener("click", (element) => {// A chaque clic sur (l' élément)  
                    
                    let removeId = element.currentTarget.closest(".cart__item").dataset.id;// On injecte dans les variables l' événement dans lequel on se trouve,             
                    let removeColor = element.currentTarget.closest(".cart__item").dataset.color;// l élément le plus proche qui correspond  au sélécteur
                    deleteItem(removeId, removeColor);// Suppression des produit                
                    window.location.reload();// Actualisation de la page
                });
                });
            
            // Modification de la quantité par input
                document.querySelectorAll(".itemQuantity").forEach(inputQuantity => {// On boucle pour chaque input de quantité
                    inputQuantity.addEventListener('change',function(){// On écoute l' input
                          
                        let newQuantity = inputQuantity.value;// On injecte la valeur de l' input dans la variable newQuantity
                            kanap.quantity = newQuantity; // On attribut la nouvelle valeur saisie à la clé quantity du tableau kanap                
                            console.log(kanap.quantity);
                        
                            if(kanap.quantity > 0 && kanap.quantity <= 100){   
                            saveProductLS(kanap.quantity);// On sauvegarde dans le localStorage la valeur mis a jour
                            window.location.reload();// recharge
                        
                            }else {
                            alert('La quantité doit être comprise entre 0 et 100 !!!!')
                            window.location.reload();
                        }
                    })       
                }) 

            });
        });
    };


// Calcul de la somme des produits
if (productFromLS !== null || productFromLS){ //On vérifie si le localStorage n' est pas vide
    let totalProduct = 0;
    let totalPrice = 0;
    
    for(let kanap of productFromLS){// On boucle pour chaque kanap du localStorage

        // Calcul de la quantité
        let quantityLap = parseInt(kanap.quantity)// On injecte la valeur en chiffre(parseInt) de kanap.quantity  dans la variable quantityLap
        totalProduct += quantityLap; //On affecte la valeur de quantityLap a total product aprés addition
        document.getElementById("totalQuantity").innerHTML = totalProduct;// Injection html

        // Calcul du prix
        fetch("http://localhost:3000/api/products/" + `${kanap.kanap_id}`)// Apel API + id
        
            .then( data => data.json())// Alors on recupère les données convertit en json()
        
                .then(function(productDetail){//Alors on récup les données dans productDétail
                    
                    let moneyLap = productDetail.price // On injecte la valeur de productdetail.price dans la variable moneyLap
                    totalPrice += moneyLap * quantityLap// On Affecte la valeur de la multiplication de moneyLap * quantityLap a totalPrice
                    document.getElementById("totalPrice").innerHTML = totalPrice;// On injecte le résultat a totalPrice
                });
    };
};
 
// Formulaire 

// Fonction pour créer un tableau de produits
let products = [];// Décla tableau

if (productFromLS !== null){// On vérifie si productFromLS n' est pas vide    
    
    for(let product of productFromLS){//On boucle pour un produit du localStorage 
        let productId = product.kanap_id;// On injecte l' id dans la variable productId
        products.push(productId);// On injecte l' id au tableau products
    }
};

// Regex

// fonction contenant la regEx pour la validation du prénom, le nom, et la ville
const regExFirstNameLastNameCity = function (value) {// Décla fonction qui permet de tester une valeur contenu dans la
return /^([a-zA-Zàâäéèêëïîôöùûüç' ]+){3,20}$/.test(value);// Regex qui autorise et renvoie les caractères a-zA-Zàâäéèêëïîôöùûüç +plusieurs fois min 3 max 20
}

// Fonction contenant la regEx pour la validation de l'adresse
const regExAdress = function (value) {// Décla fonction qui permet de tester une valeur contenu dans la
return /^[a-zA-Z\s\d\/]*\d[a-zA-Z\s\d\/]*$/.test(value);// Regex qui autorise et renvoie les caractères a-z A-Z et demande u  chiffre  0-9,
                                                            //et les espaces 
}

//Fonction contenant la regex pour la validation de l'adresse mail
const regExMail = function (value) {// Décla fonction qui permet de tester une valeur contenu dans la
return /^([a-zA-Z0-9]+(([\.\-\_]?[a-zA-Z0-9]+)+)?)\@(([a-zA-Z0-9]+[\.\-\_])+[a-zA-Z]{2,4})$/.test(value);// Regex qui autorise et renvoie les caractères a-zA-Zàâäéèêëïîôöùûüç.-, 1 @,les caractères
                                                                                                           //a-z A-Z 0-9+plusieurs fois, 1 ., a-z min 2 max 10
}
// Fonctions qui controle la validité du formulaire 

//Contrôle de la validité du prenom
checkFirstName = function(contact) {     
    const theFirstName = contact.firstName;   
    if (regExFirstNameLastNameCity(theFirstName)) {
        document.querySelector('#firstNameErrorMsg').textContent = "";
        return true;    
    } else {
        document.querySelector('#firstNameErrorMsg').textContent = "Le prénom n'est pas valide";           
        return false;
    };
};
//Contrôle de la validité du nom
checkLastName = function(contact) {    
    const theLastName = contact.lastName;
    if (regExFirstNameLastNameCity(theLastName)) {
        document.querySelector('#lastNameErrorMsg').textContent = "";            
        return true;
    
    } else {
        document.querySelector('#lastNameErrorMsg').textContent = "Le nom n'est pas valide";  
        return false;
    };
};
//Contrôle de la validité de l'adresse
checkAdress = function(contact) {     
    const theAdress = contact.address;
    if (regExAdress(theAdress)) {         
        document.querySelector('#addressErrorMsg').textContent = ""; 
        return true;    
    } else {        
        document.querySelector('#addressErrorMsg').textContent = "L'adresse n'est pas valide"; 
        return false;
    };
};
//Contrôle de la validité de la ville
checkCity = function(contact) {    
    const theCity = contact.city;
    if (regExFirstNameLastNameCity(theCity)) {
         document.querySelector('#cityErrorMsg').textContent = ""; 
        return true;    
    } else {
        document.querySelector('#cityErrorMsg').textContent = "La ville n'est pas valide"; 
        return false;
    };
};

//Contrôle de la validité de l'email
checkEmail = function(contact) {     
    const theEmail = contact.email;
    if (regExMail(theEmail)) {
        document.querySelector('#emailErrorMsg').textContent = ""; 
        return true;    
    } else {
        document.querySelector('#emailErrorMsg').textContent = "L'adresse mail n'est pas valide"; 
        return false;
    };
};

//Mettre les valeurs du localStorage dans les champs du formulaire(permet de les conserver même au changement de page)
const dataLocalStorage = localStorage.getItem('contact');

const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

// On met les valeurs du localStorage dans les champs du formulaire(permet de les conserver même au changement de page)
if(dataLocalStorageObjet == null) {
    
    console.log('le formulaire est vide');
} else {
   
    document.querySelector("#firstName").value = dataLocalStorageObjet.firstName;
    document.querySelector("#lastName").value = dataLocalStorageObjet.lastName;
    document.querySelector("#address").value = dataLocalStorageObjet.address;
    document.querySelector("#city").value = dataLocalStorageObjet.city;
    document.querySelector("#email").value = dataLocalStorageObjet.email;
}


//Evenement au clic sur le bouton commander
const buttonOrder = document.querySelector('#order');
buttonOrder.addEventListener('click',(element) => {
    element.preventDefault();
//Récupération des valeurs (dans un objet) du formulaire qui vont aller dans le localStorage   
const contact = {
    firstName: document.querySelector('#firstName').value,
    lastName: document.querySelector('#lastName').value,
    address: document.querySelector('#address').value,
    city: document.querySelector('#city').value,
    email: document.querySelector('#email').value
    }  
    checkFirstName(contact);
    checkLastName(contact);
    checkAdress(contact);
    checkCity(contact);
    checkEmail(contact);
    // On vérifie si tous les input sont conformes, les valeurs sont stockés dans le localStorage 
    if (checkFirstName(contact) && checkLastName(contact) && checkAdress(contact) && checkCity(contact) && checkEmail(contact)) {  
        // Mettre l'objet 'contact' dans le localStorage
        localStorage.setItem('contact', JSON.stringify(contact))// stringify transforme l'objet en chaine de caractere       
        //On met les valeurs du formulaire des produits sélectionnés l' objet à envoyer au serveur
        const dataToSend = {
            products,
            contact
        }
        
       
        // Envoi de l'objet 'dataToSend' vers le serveur
        fetch("http://localhost:3000/api/products/order", {
            
        method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })

        .then(response => response.json())
        
        .then(function(data){
            window.location.href = "./confirmation.html?id=" + data.orderId;
        })
        
    } else {
        alert("Le formulaire n'est pas correctement rempli");
    };
});