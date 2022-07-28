////// JSON.parse = traduit une chaîne de caractères en JavaScript et on lui donne 
////// en paramètre a traiter la clé product contenu dans le localStorage avec la fonction getItem

let productFromLS = JSON.parse(localStorage.getItem('product'));
console.log(productFromLS);

////// Condition pour vérifier if le localStorage n' est pas vide ou égal a rien 

    if(productFromLS === null || productFromLS == 0){

////// Si le localStorage n' est pas vide on injecte a la volée un H2 avec la fonction innerHTML

      console.log('je suis vide');
      document.getElementById("cart__items").innerHTML += `<h2>Le panier est vide</h2>`;

    }else{

////// Sinon on boucle pour chaque produit défini par kanap,
////// le fait de faire une requête fetch qui fait un appel a l' api en ajoutant 
////// le fait que l' on veut récuperer les infos du produit en fonction de son id.

      productFromLS.forEach((kanap) => {

////// Methode Fetch pour récupérer les données qui ne sont pas stockées dans le localStorage par `${concatenation}`.
////// fetch renvoie une promise qui fournie une méthode then qui sera éxécutée qd le résultat aura été obtenu.
          
          fetch("http://localhost:3000/api/products/" + `${kanap.id}`)

////// alors si il y a une réponse de l' api on veut convertir cette réponse en javaScript objet notation("string")

          .then(response => response.json())

////// alors ont récupère sa valeur dans productDetail 
          
            .then(function(productDetail){

//////  Ont ajoute les produits dans la page panier via innerHTML en rassemblant grâce à la concaténation les infos contenues dans l' api (kanap)
///// + les infos du localStorage (productDetail) en récupérant par le paramètre de la boucle forEach l' id des produits.			              

                document.getElementById("cart__items").innerHTML += `
                  <article class="cart__item" data-id="${kanap.id}" data-color="${kanap.color}">
                      <div class="cart__item__img">
                          <img src="${productDetail.imageUrl}" alt="${productDetail.altTxt}">
                      </div>
                      <div class="cart__item__content">
                          <div class="cart__item__content__description">
                          <h2>${productDetail.name}</h2>
                          <p>${kanap.color}</p>
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
  console.log(kanap);
                  // Sélection des boutons supprimer

////// On sélectionne .deleteItem (input) avec querySelectorAll(querySelector ne fonctionne pas) et on boucle

                  document.querySelectorAll(".deleteItem").forEach(button => {
                  
///// Pour chaque click sur button .deleteItem (element) 

                  button.addEventListener("click", () => {

////// On récupère data-id déclarer dans .cart_item pour injecter sa valeur dans removeID
////// On récupère data-color déclarer dans .cart_item pour injecter sa valeur dans removeColor
                      let removeId = this.dataset.id;
                      let removeColor = this.dataset.color;
                      //console.log(removeId);
                      //console.log(removeColor);
                      
// Suppression du produit
////// On appel la fonction deleteItem en lui passant en paramètre ce que l' on veut effacer

                      deleteItem(removeId, removeColor);
                      console.log(productFromLS);
                      
// Actualisation de la page
                      window.location.reload();
                  });

                });
              
// Modification de la quantité

////// On sélectionne l' input .itemQuantity (input dans lequel est entrer la valeur)
////// Puis on boucle pour chaque valeur inputQuantity 
////// On écoute au changement (change se déclenche lorsqu'un nouveau choix est fait dans un élément sélectionné) 

    document.querySelectorAll(".itemQuantity").forEach(inputQuantity => {
                  
        inputQuantity.addEventListener("change", (element) => {
                      
//////La propriété currentTarget, accessible en lecture seule et rattachée à l'interface Event, identifie la cible courante 
//////pour l'évènement lorsque celui-ci traverse le DOM. Elle fait toujours référence à l'élément sur lequel
////// le gestionnaire d'évènement a été attaché tandis que Event.target identifie l'élément à partir duquel
////// l'évènement s'est produit (event.target peut donc être un descendant de event.currentTarget).

//////La closest()méthode de l' Element interface parcourt l'élément et ses parents (en se dirigeant vers la racine du document)
////// jusqu'à ce qu'elle trouve un noeud qui corresponde au sélecteur CSS spécifié .
////// Ici on va parcourir l' input .itemQuantity pour récupérer sa valeur 
////// Puis l' élément .cart__item pour récupérer la valeur de l' id et la valeur color

                      let newQuantity = element.currentTarget.closest(".itemQuantity").value;
                      let id = element.currentTarget.closest(".cart__item").dataset.id;
                      let color = element.currentTarget.closest(".cart__item").dataset.color;

////// On utilse la méthode find pour trouver ici un élément qui satisfait la condition qui vérifie si element.id est strictement égal à l' id
////// Et element.color est strictement égal à color

                      let myProduct = productFromLS.find(element => 
                        
                        (element.id === id)&&(element.color === color));

//// On apel la fonction changeQuantity en lui passant en paramètre myProduct et newQuantity pour afficher la nouvelle quantité

                      changeQuantity(myProduct, newQuantity);

//////puis on rechage la page pour afficher les nouvelles données
                      window.location.reload();
                      
                  });
              });
          });
      });
  };

////// fonction qui prend en paramètre id et color
////// On veut injecter dans productFromLS la valeur du résultat du parcour du tableau productFromLS.filter() 
////// Le parcour du tableau vérifie (if) si il y a un bien un id ET une color présente dans productFromLS
////// Pour l' effacer (return false) le cas écheant  
////// ET aprés cette vérification on renvoie les nouvelles données au localStorage pour mise a jour
  deleteItem = (id, color) => {

    productFromLS = productFromLS.filter(kanap => {
        
        if(kanap.id == id && kanap.color == color){    
            return false;
        } 
    });

    localStorage.setItem("product", JSON.stringify(productFromLS));
};

// Fonction pour modifier la quantité
//////fonction qui prend en paramètre kanap et newQuantity 
////// Et qui va modifier la valeur de kanap.quantity par newQuantity
////// Puis on renvoie les nouvelles données au localStorage pour mise a jour

changeQuantity = (kanap, newQuantity) => {
    kanap.quantity = newQuantity;
    localStorage.setItem("product", JSON.stringify(productFromLS));
};


// Calcul de la somme des produits
////// Si productFromLS n' est pas null 
if (productFromLS !== null){

////// Décla variable à 0 pour pouvoir injecter les totaux    
    let totalProduct = 0;
    let totalPrice = 0;

    ////// On boucle par kanap par kanap du productFromLS
    for(let kanap of productFromLS){

        // Calcul de la quantité
    ////// On injecte la valeur de kanap.quantity dans la variable quantitySelected
    ///// parseInt permet de récuperer la valeur (number) de quantity

        let quantitySelected = parseInt(kanap.quantity)
        console.log(quantitySelected)

    ////// On affecte la valeur de quantitySelected dans la variable totalProduct    
        totalProduct += quantitySelected;
        document.getElementById("totalQuantity").innerHTML = totalProduct;

        // Calcul du prix

        ////// Methode Fetch pour récupérer les données qui ne sont pas stockées dans le localStorage par `${concatenation}`.

        fetch("http://localhost:3000/api/products/" + `${kanap.id}`)
        
        //alors si il y a une réponse de l' api on veut convertir cette réponse en javaScript objet notation("string")        
        
        .then( data => data.json())
        
        ////// alors ont récupère sa valeur dans productDetail 

            .then(function(productDetail){
            
                ////// On injecte la valeur de productDetail.price dans dataPrice

                let dataPrice = productDetail.price
                
                ///// On injecte le résultat de dataPrice * par quantitySelected dans totalPrice

                totalPrice += dataPrice * quantitySelected

                ////// On injecte la valeur de totalPrice à la volée dans le span totalPrice

                document.getElementById("totalPrice").innerHTML = totalPrice;
        });
    };
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////FORMULAIRE////////////////////////////////////////////////////////////