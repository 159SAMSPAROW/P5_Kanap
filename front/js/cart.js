let productFromLS = JSON.parse(localStorage.getItem('product'));
console.log(productFromLS);

let structureProductForBasket = [];

    if(productFromLS === null || productFromLS == 0){

      console.log('je suis vide');
      document.getElementById("cart__items").innerHTML += `<h2>Le panier est vide</h2>`;

    }else{
      productFromLS.forEach((kanap) => {
          /* Methode Fetch pour récupérer les données qui ne sont pas stockés dans le localStorage, 
          y compris les données sensibles comme le prix*/
          
          fetch("http://localhost:3000/api/products/" + `${kanap.id}`)
          .then(response => response.json())
          
            .then(function(productDetail){
              
            // Ajout des produits dans la page panier
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
  
                  // Sélection des boutons supprimer
                  document.querySelectorAll(".deleteItem").forEach(button => {
                  // Pour chaque clique
                  button.addEventListener("click", (element) => {
                      let removeId = element.currentTarget.closest(".cart__item").dataset.id;
                      let removeColor = element.currentTarget.closest(".cart__item").dataset.color;
                      console.log(removeId);
                      console.log(removeColor);
                      // Suppression du produit
                      eraseCart(removeId, removeColor);
                      console.log(productFromLS);
                      // Actualisation de la page
                       window.location.reload();
                  });
              });
              
              // Modification de la quantité
              document.querySelectorAll(".itemQuantity").forEach(inputQuantity => {
                  inputQuantity.addEventListener("change", (element) => {
                      let newQuantity = element.currentTarget.closest(".itemQuantity").value;
                      let id = element.currentTarget.closest(".cart__item").dataset.id;
                      let color = element.currentTarget.closest(".cart__item").dataset.color;
                      let myProduct = productFromLS.find(element => (element.id === id)&&(element.color === color));
                      changeQuantity(myProduct, newQuantity);
                      window.location.reload();
                  });
              });
          });
      });
  };
  eraseCart = (id, color) => {
    productFromLS = productFromLS.filter(kanap => {
        if(kanap.id == id && kanap.color == color){
            return false;
        } 
        return true;
    });
    localStorage.setItem("product", JSON.stringify(productFromLS));
};

// Fonction pour modifier la quantité
changeQuantity = (kanap, newQuantity) => {
    kanap.quantity = newQuantity;
    localStorage.setItem("product", JSON.stringify(productFromLS));
};