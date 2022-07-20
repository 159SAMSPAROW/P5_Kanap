//Récuperation de la clé product contenu dans le localStorage 
const productsFromLS = JSON.parse(localStorage.getItem("product"));

//Création des tableau
const orderProduct = [];
const tableId = [];
const tablePrice = [];
const apiContent = [];

//Décla variables
let kanap_id;
let kanap_img;
let kanap_Price;
let priceProduct;
let kanap_Name;
let kanap_Alt;

/*main();
function main(){
saveproduct();
totalQuantityProduct();
price();
}*/

//fonction qui récupère l' id et le prix via l' api
function apiCall(id){

    const kanap = fetch("http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926");

        kanap.then((res, err)=>{
            
            if (res.ok){
                
                let kanapPromise = res.json()
                kanapPromise.then((kanapTable)=>{
                    
                   for (let k = 0; k < kanapTable.length; k++){
                        console.log('dfkjvhqksudFHS')
                        //priceProduct = kanapTable[k]["price"];
                        kanap_id = kanapTable[k]["_id"];
                        kanap_img = kanapTable[k]["imageUrl"]; 
                        kanap_Alt =  kanapTable[k]["altTxt"];
                        kanap_Name  = kanapTable[k]["name"];
                        kanap_Price  = kanapTable["price"];
                        console.log(kanap_Price);

                        tablePrice.push(priceProduct);
                        tableId.push(kanap_id);
                        apiContent.push(kanapTable[k]["price"],kanapTable[k]["_id"],kanapTable[k]["name"],kanapTable[k]["imageUrl"]);
                        
                    //}   console.log(apiContent);
                        //console.log(priceProduct);
                        //console.log(kanap_id);
                        //console.log(kanap_Price);
                        //console.log(kanap_Alt);
                        //console.log(kanap_Name);
                        console.log(kanap_Price);
                })
            }  

        

    }).catch((err)=>{
        alert("erreur de chargement de l' api")
});

}
apiCall();

function displayProduct(){

    if (productsFromLS !== null) {
        for (let p = 0; p < productsFromLS.length; p++){
            console.log(productsFromLS[p].id)
            apiCall(productsFromLS[p].id);
            //console.log(productsFromLS[p].color);
            //console.log(apiContent);

                cart__items.innerHTML += `<article class="cart__item" data-id="${productsFromLS[p].id}" data-color="${productsFromLS[p].color}">
        <div class= "cart__item__img">
          <img src="${apiContent[3]}" alt="">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${apiContent[2]}</h2>
            <p>${productsFromLS[p].color}</p>
            <p>${apiContent[4]} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté :${productsFromLS[p].quantity} </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
          </article>`

        }
    } else {
        cart__items.innerHTML += `<h2>Votre panier est vide</h2>`
        alert("Le panier est vide!!!")
    }
};
//apiCall();
displayProduct();

