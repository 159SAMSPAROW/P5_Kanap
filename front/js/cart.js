/********************************Récupération du localStorage **********************************************************/

// Les éléments du localStorage sont récupérées
let panier = JSON.parse(localStorage.getItem("product"));
//console.table(panier);
/********************************************* Fin ****************************************************************** */

/******************************** Modification du panier ************************************************************ */
function saveProductLS(product) {
    return localStorage.setItem("product", JSON.stringify(panier));
  }
  
  function getValue(option) { // fonction de récupération des options/quantité selectionnées
    return document.getElementsByClassName(option).value
}

// Change la quantité depuis la page panier

/*function changeQuantity(){
    let quantity = parseInt(getValue(".itemQuantity"));
    //console.log(quantity);
    for (let p = 0; p < panier.length; p++) { 
        if ((panier[p]['kanap_id'] == kanap_id) &&
            (panier[p]['selectedcolor'] == selectedcolor)) { //pour chercher si une correspondance nom/couleur existe deja
            return [
                (panier[p]['quantity']) += quantity, // si oui on ajoute la quantité voulu
                saveProductLS(panier) //appel de la fonction de sauvegarde du "product" dans le localstorage
            ]
        }
    }
}*/
// Fonction pour supprimer le produit avec l'id et la couleur correspondante
function deleteItem(id, color)  {
    panier = panier.filter(kanap => {
        if(kanap.kanap_id == id && kanap.selectedcolor == color){
            return false;
        } 
        return true;
    });
    localStorage.setItem("product", JSON.stringify(panier));
};

// Condition pour l'ensemble du panier
if (panier === null || panier == 0) {
    document.getElementById("cart__items").textContent = 'Votre panier Kanap est vide'

}else{
    panier.forEach((kanap) => {
        /* Methode Fetch pour récupérer les données qui ne sont pas stockés dans le localStorage, 
        y compris les données sensibles comme le prix*/
        fetch("http://localhost:3000/api/products/" + `${kanap.kanap_id}`)
        .then(response => response.json())
            
            .then(function(productDetail){
            // Ajout des produits dans la page panier
            document.getElementById("cart__items").innerHTML += `
                <article class="cart__item" data-id="${kanap.kanap_id}" data-color="${kanap.selectedcolor}">
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
                document.querySelectorAll(".deleteItem").forEach(button => {
                // Pour chaque clique
                button.addEventListener("click", (element) => {
                    
                    let removeId = element.currentTarget.closest(".cart__item").dataset.id;
                    let removeColor = element.currentTarget.closest(".cart__item").dataset.color;
                    
                    console.log(removeId);
                    console.log(removeColor);
                    // Suppression du produit
                    deleteItem(removeId, removeColor);
                    console.log(panier);
                    // Actualisation de la page
                    window.location.reload();
                });
                });
            
            // Modification de la quantité
                document.querySelectorAll(".itemQuantity").forEach(inputQuantity => {
                
                    inputQuantity.addEventListener('input', function(){
                    console.log('fonctionne stp!!!');
                    console.log(kanap.quantity)
                    let newQuantity = inputQuantity.value;
                    kanap.quantity = newQuantity; 
                    saveProductLS(kanap.quantity);
                    win
                    })
                })
            
           
            });
            });
        };

// Calcul de la somme des produits
if (panier !== null){
    let totalProduct = 0;
    let totalPrice = 0;
    for(let kanap of panier){

        // Calcul de la quantité
        let quantityLap = parseInt(kanap.quantity)
        totalProduct += quantityLap;
        document.getElementById("totalQuantity").innerHTML = totalProduct;

        // Calcul du prix
        fetch("http://localhost:3000/api/products/" + `${kanap.kanap_id}`)
        .then( data => data.json())
        .then(function(productDetail){
            let moneyLap = productDetail.price
            totalPrice += moneyLap * quantityLap
            document.getElementById("totalPrice").innerHTML = totalPrice;
        });
    };
};

/********************************************* Fin ************************************************************************* */



//--------------------------------------------------------------------------------------------------------------------------//
// ------------------------------------------- Formulaire -----------------------------------------------------------------//
//------------------------------------------------------------------------------------------------------------------------//

// Fonction pour créer un tableau de produits
let products = [];
if (panier !== null){
    for(let product of panier){
        let productId = product.kanap_id;
        products.push(productId);
    }
};
console.log(panier);
//***************************************** REGEX ********************************************************* */
// fonction contenant la regEx pour la validation du prénom, le nom, et la ville
const regExFirstNameLastNameCity = (value) => {
return /^([a-zA-Zàâäéèêëïîôöùûüç' ]+){3,20}$/.test(value);
}

// Fonction contenant la regEx pour la validation de l'adresse
const regExAdress = (value) => {
return /^[a-zA-Zàâäéèêëïîôöùûüç'0-9\s,.'-]{3,}$/.test(value);
}

//Fonction contenant la regex pour la validation de l'adresse mail
const regExMail = (value) => {
return /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(value);
}
/**************************************** Fin des REGEX *************************************************** */

/************************ Fonctions qui controle la validité du formulaire********************************* */ 

//Contrôle de la validité du prenom
checkFirstName = (contact) => { 
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
checkLastName = (contact) => { 
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
checkAdress = (contact) => { 
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
checkCity = (contact) => { 
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
checkEmail = (contact) => { 
    const theEmail = contact.email;
    if (regExMail(theEmail)) {
        document.querySelector('#emailErrorMsg').textContent = ""; 
        return true;
    } else {
        document.querySelector('#emailErrorMsg').textContent = "L'adresse mail n'est pas valide"; 
        return false;
    };
};
// ****************************************************************** Fin *******************************************************************//

/* ***********Mettre les valeurs du localStorage dans les champs du formulaire(permet de les conserver même au changement de page)*******************************/

const dataLocalStorage = localStorage.getItem('contact');

const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

// Mettre les valeurs du localStorage dans les champs du formulaire(permet de les conserver même au changement de page)
if(dataLocalStorageObjet == null) {
    console.log('le formulaire est vide');
} else {
    document.querySelector("#firstName").value = dataLocalStorageObjet.firstName;
    document.querySelector("#lastName").value = dataLocalStorageObjet.lastName;
    document.querySelector("#address").value = dataLocalStorageObjet.address;
    document.querySelector("#city").value = dataLocalStorageObjet.city;
    document.querySelector("#email").value = dataLocalStorageObjet.email;
}
/******************************** fin ******************************************************************************************** */

/***************************************Evenement au clic sur le bouton commander**************************************************/
const buttonOrder = document.querySelector('#order');
buttonOrder.addEventListener('click',(element) => {
    element.preventDefault();

    //Récupération des valeurs (que je met dans un objet) du formulaire qui vont aller dans le localStorage
    const contact = {
        firstName: document.querySelector('#firstName').value,
        lastName: document.querySelector('#lastName').value,
        address: document.querySelector('#address').value,
        city: document.querySelector('#city').value,
        email: document.querySelector('#email').value
    }
    console.log(contact);

    checkFirstName(contact);
    checkLastName(contact);
    checkAdress(contact);
    checkCity(contact);
    checkEmail(contact);

    // ------------------- Si tous les input sont conformes, les valeurs sont stockés dans le localStorage -------------------------------//

    if (checkFirstName(contact) && checkLastName(contact) && checkAdress(contact) && checkCity(contact) && checkEmail(contact)) {  
        // Mettre l'objet 'contact' dans le localStorage
        localStorage.setItem('contact', JSON.stringify(contact))// stringify transforme l'objet en chaine de caractere
        
        // Mettre les 'values' du formulaire et mettre les produits sélectionnés dans un objet à envoyer vers le serveur
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