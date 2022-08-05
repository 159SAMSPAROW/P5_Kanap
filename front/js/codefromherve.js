let productsFromLS = JSON.parse(localStorage.getItem("product"));

console.log(productsFromLS);

let produitCommande = []
let kanap_id;
let kanapPrix;
let produitPrix;
let tableauId = [];
let tableauPrix = [];

let contenuApi=[];

/*function main() {

  appelApi();
 
  saveproduct();
  
  quantiteTotalproduct();
  prix()
  
};

main();*/


/////////////////////APPEL API //TEST //COMPARAISON du localstorage et /prix api/////////////////

function appelApi() {

  const kanap = fetch("http://localhost:3000/api/products");
  
  kanap.then((response) => {
    
    let kanapprom = response.json();
    
    kanapprom.then((kanaptabs) => {
      // tableau à boucler par index=k
      for (let k = 0; k < kanaptabs.length; k++) {

       contenuApi.push([kanaptabs[k]['_id'], kanaptabs[k]['price']]);
       
       produitPrix = kanaptabs[k]['price'];//creation de variable pour le prix
       produitId = kanaptabs[k]['_id'];
       
       tableauPrix.push(produitPrix)
       tableauId.push(produitId)
        
      }
      console.log(contenuApi)

      ///////
     
    });
  });
  
}
appelApi();



//////////////////FONCTION affichage Produit    Selectionne////////////////

function affichageProduitSelectionne() {
  
  let produitSelectionne = document.getElementById("cart__items");
  
  if (productsFromLS === null || productsFromLS == 0) {//si le panier est vide affichage 
    const productVide = document.querySelector('h1')
    productVide.innerHTML = `<h1>Votre panier est vide</h1>`

    //alert('Votre panier est vide');

  } else {
    let produitCommande = [];//sinon creation  et recuperation du panier
    
    for (p = 0; p < productsFromLS.length; p++) {
      /////////////////////////////////////////////////
      var idpanier = productsFromLS[p]['id'];
      var idprice = productsFromLS[p]['price']; 
    }
      console.log(idpanier);
///////////////APPEL API POUR VERIF DU PRIX//////////////////////

      let kanap = fetch("http://localhost:3000/api/products");
     
      kanap.then((response) => { 
     
        let kanapprom = response.json();
     
        kanapprom.then((kanaptabs) => { 
         for (let k = 0; k < kanaptabs.length; k++) {

             if (idpanier == kanaptabs[k]['_id']){
                idprice = kanaptabs[k]['price'] 
              }
          }

  });
     
  });
/////////////////////////////////////////////////////
      produitCommande +=

      `
      <article class="cart__item" data-id="${idpanier}" data-color="${productsFromLS[p].selectedcolor}">
      <div class="cart__item__img">
      <img src="${productsFromLS[p].img}" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
      <div class="cart__item__content__description">
      <h2>${productsFromLS[p].name}</h2>
      <p>${productsFromLS[p].selectedcolor}</p>
      <p>${idprice} €</p>
      </div>
      <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productsFromLS[p].quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
      </div>
      </div>
      </div>
      </article>

      `;
 };

    if (p === productsFromLS.length) {
      produitSelectionne.innerHTML = produitCommande

   };
};    
 


affichageProduitSelectionne()
supprimerProduit();
changeQuantiteproduct()

///////////////////////////////////
//fonction de sauvegarde du "product" dans le localstorage
function saveproduct() {
  localStorage.setItem("product", JSON.stringify(productsFromLS));
}

function supprimerProduit() {

  let btnDelete = document.querySelectorAll('.deleteItem');


  for (let t = 0; t < btnDelete.length; t++) {
    btnDelete[t].addEventListener('click', (e) => {

      let idSupprimer = productsFromLS[t].kanap_id;

      productsFromLS = productsFromLS.filter(el => el.kanap_id !== idSupprimer);

      saveproduct();

      window.location.href = 'cart.html';

    });
  };

}


////////////////////QUANTITÉ TOTAL DU product////////////////////
function quantiteTotalproduct() {
  let quantiteTotal = [];

  for (let m = 0; m < productsFromLS.length; m++) {
    let quantiteProduit = productsFromLS[m].quantity;

    quantiteTotal.push(quantiteProduit);
  };

  const reducer = (accimulator, currentValue) => accimulator + currentValue;
  const total = quantiteTotal.reduce(reducer, 0);

  document.getElementById('totalQuantity').innerHTML = total;

};



//////////////////CHANGER LES QUANTITE DANS LE product//////////

function getArrayFromDOM(id) { // recupération des collections HTML et changement en tableau JavaScript
  let HTMLcoll = document.getElementsByClassName(id);
  let arr = Array.from(HTMLcoll);

  return arr
};


function changeQuantiteproduct() {



  let ArrayInput = getArrayFromDOM('itemQuantity'); // creation d un tableau des inputs quantité


  for (let input of ArrayInput) { // ecoute des modif d input quantité 
    input.addEventListener('change', () => {
      let index = ArrayInput.indexOf(input) //cherche index
      console.log(index)
      if (input.value < 0) {
        alert("La quantité doit être supérieur a zéro")
        input.value = productsFromLS[index]['quantity']
      } else {
        productsFromLS[index]['quantity'] = parseInt(input.value) // on assigne la quantité au bon artcile
        window.location.href = `./cart.html`;
        saveproduct();
        prix()
        

      };
    });
  };
};





////////////////////PRIX TOTAL DU product///////////////////


function prix() {
  let arrayPrix = []
  for (let q = 0; q < productsFromLS.length; q++) {
    let quantitePourUnProduit = productsFromLS[q]['quantity'];
    let prixPourUnProduit = productsFromLS[q]['price'];
    let prixTotal = quantitePourUnProduit * prixPourUnProduit;
    arrayPrix.push(prixTotal)

  }

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalPrice = arrayPrix.reduce(reducer, 0);

  document.getElementById('totalPrice').innerHTML = totalPrice;

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









  ////////controle des champs du contact////////



  let inputFirstName = document.getElementById('firstName');
  let inputLastName = document.getElementById('lastName');
  let inputAddress = document.getElementById('address');
  let inputCity = document.getElementById('city');
  let inputEmail = document.getElementById('email')

  const regexWord = (value) => {
    return /^[\w\- ]{3,}$/i.test(value);
  };
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;





  ///////////validation firstName//////////////
  inputFirstName.addEventListener('change', () => {

    if (regexWord(inputFirstName.value)) {
      document.getElementById('firstNameErrorMsg').innerHTML = `<p id="firstNameErrorMsg">OK !</p>`
    } else {
      document.getElementById('firstNameErrorMsg').innerHTML = `<p id="firstNameErrorMsg">Veuillez renseigner un prénom valide !</p>`
    }
  })


  ///////////////VALIDATION LASTNAME////////////////////

  inputLastName.addEventListener('change', () => {

    if (regexWord(inputLastName.value)) {
      document.getElementById('lastNameErrorMsg').innerHTML = `<p id="firstNameErrorMsg">OK !</p>`
    } else {
      document.getElementById('lastNameErrorMsg').innerHTML = `<p id="lastNameErrorMsg">Veuillez renseigner un nom valide !</p>`
    }
  });


  //////////////////////VALIDATION ADRESSE////////////////////


  inputAddress.addEventListener('change', () => {

    if (regexWord(inputAddress.value)) {
      document.getElementById('addressErrorMsg').innerHTML = `<p id="addressErrorMsg">OK !</p>`
    } else {
      document.getElementById('addressErrorMsg').innerHTML = `<p id="addressErrorMsg">Veuillez renseigner une adresse valide !</p>`
    }
  })


  ///////////////////VALIDATION CITY///////////////////////



  inputCity.addEventListener('change', () => {

    if (regexWord(inputCity.value)) {
      document.getElementById('cityErrorMsg').innerHTML = `<p id="cityErrorMsg">OK !</p>`
    } else {
      document.getElementById('cityErrorMsg').innerHTML = `<p id="cityErrorMsg">Veuillez renseigner une ville valide !</p>`
    }
  })



  ///////////////////////VALIDATION EMAIL//////////////////////


  inputEmail.addEventListener('change', () => {

    if (regexEmail.test(inputEmail.value)) {
      document.getElementById('emailErrorMsg').innerHTML = `<p id="emailErrorMsg">OK !</p>`
    } else {
      document.getElementById('emailErrorMsg').innerHTML = `<p id="emailErrorMsg">Veuillez renseigner un email valide !</p>`
    }
  })



//////////////////COMMANDE ////////////////////////////////



  const btnOrder = document.getElementById('order')
  var formFirst = document.getElementById('firstName');
  var formLast = document.getElementById('lastName');
  var formAdress = document.getElementById('address');
  var formCity = document.getElementById('city');
  var formMail = document.getElementById('email');
  //////////////////////////////////////////////////

 /////////////////////////////////////////////

  btnOrder.addEventListener("click", (e) => {



    e.preventDefault();
    if (
      !formFirst.value ||
      !formLast.value ||
      !formAdress.value ||
      !formCity.value ||
      !formMail.value

      ) {
 
      alert('Veuillez remplir tous les champs du formulaire !!')
    } else {

      const contact = {
        firstName: `${formFirst.value}`,
        lastName: `${formLast.value}`,
        address: `${formAdress.value}`,
        city: `${formCity.value}`,
        email: `${formMail.value}`,
      }

      localStorage.setItem("contact", JSON.stringify(contact));

      //////////////////////

      let products = []
      for (i = 0; i < productsFromLS.length; i++) {
        products.push(productsFromLS[i].kanap_id)
        console.log(productsFromLS)
      }

      let envoiProducts = { contact, products }
      console.log(envoiProducts);


      ///////////////:ENVOIE DE LA COMMANDE AU BACKEND ///////////////

      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(envoiProducts),
        headers: {
          "content-type": "application/json",
        }
      })
        // POUR AVOIR LE RETOUR SERVEUR    
        .then(res => {
          return res.json();
        }).then((data) => {
          let orderId = data.orderId
          window.location.href = `./confirmation.html?id=${orderId}`;
          console.log(orderId);
        }).catch((error) => {
          alert('Un probleme est survenu !!! Veuillez rééssayer ulterieurement')
          console.log(error);
        })
      }
    }
    );



  ///////////////////////////////////////////////////////////////////////////////////////////////
*/
