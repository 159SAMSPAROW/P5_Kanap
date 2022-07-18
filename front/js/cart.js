//Récuperation de la clé product contenu dans le localStorage 
const productsFromLS = JSON.parse(localStorage.getItem("product"));

//Création des tableau
const orderProduct = [];
const tableId = [];
const tablePrice = [];
const apiContent = [];

//Décla variables
let kanap_id;
let kanapPrice;
let priceProduct;

/*main();
function main(){
saveproduct();
totalQuantityProduct();
price();
}*/

//fonction qui récupère l' id et le prix via l' api
function apiCall(){
 
    const kanap = fetch("http://localhost:3000/api/products");
 
    kanap.then((res) => {
        kanap.then((res, err)=>{
            
            if (res.ok){
                
                let kanapPromise = res.json()
                kanapPromise.then((kanapTable)=>{
                    
                    for (let k= 0; k < kanapTable.length; k++){
                        priceProduct = kanapTable[k]["price"];
                        kanap_id = kanapTable[k]["_id"];
                        kanap_img = kanapTable[k]["imgUrl"];    

                        tablePrice.push(priceProduct);
                        tableId.push(kanap_id);
                        apiContent.push(kanapTable[k]["price"],kanapTable[k]["_id"]);
                        //console.log(apiContent);
        
                    }
                })
            }  

        }).catch((err)=>{
            alert("erreur de chargement de la page")
        })

    }).catch((err)=>{
        alert("erreur de chargement de l' api")
});

}
apiCall();


function displayProduct(){
    
    let selectedProduct = document.getElementById("cart__items");
        if(productsFromLS == null){
            console.log("erreur")
            selectedProduct.innerHtml += "<h1>Votre panier est vide</h1>"

        }else{

            const selectedProduct = document.getElementById("cart__items");;
            let kanap_id;        
            let priceId;
            const kanapTab = [];

                for(p = 0; p < productsFromLS.length; p++){
                    kanap_id = productsFromLS[p]["_id"];
                    priceId = productsFromLS[p].price;
                    
                 }
                 
                 console.log(productsFromLS);
                 //Apel api pour verifier le prix
                 let kanap = fetch("http://localhost:3000/api/products");
                    kanap.then((response) => { 
                        
                        let kanapPromise = response.json();
                        
                        kanapPromise.then((kanapTable) => { 
                            
                            for (let k = 0; k < kanapTable.length; k++) {
           
                                if (kanap_id == kanapTable[k]['_id']){
                                    priceId = kanapTable[k]['price']
                                    
                                }

            }
         
             })
                
             })
             
             selectedProduct.innerHTML +=
             `<article class="cart__item" data-id="${tableId}"data-color="${productsFromLS.color}">
             <div class="cart__item__img">
             <img src="${productsFromLS.imageUrl}" alt="Photographie d'un canapé">
             </div>
             <div class="cart__item__content">
             <div class="cart__item__content__description">
             <h2>${productsFromLS.name}</h2>
             <p>${productsFromLS.description}</p>
             <p>45 €</p>
             </div>
             <div class="cart__item__content__settings">
             <div class="cart__item__content__settings__quantity">
             <p>Qté : </p>
             <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productsFromLS}">
             </div>
             <div class="cart__item__content__settings__delete">
             <p class="deleteItem">Supprimer</p>
             </div>
             </div>
             </div>
             </article>` 
             
           

      
         }console.log(productsFromLS)
       
};
displayProduct();

