//recup url api par id
const urlParam = (new URL(location)).searchParams;
const productId = urlParam.get("id");
console.log(productId);
//test console pour voir si on recoit bien l id


//decla variable pour pouvoir faire l' injection dans le html
const imgKanap = document.querySelector(".item__img");
const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");


//recup produit par id
const kanapId = fetch(`http://localhost:3000/api/products/${productId}`);

//promise asynchrone qui répond par un fichier json si la reponse est positive
kanapId.then(async(res, err) => {

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

    if (quantity.value > 0 && quantity.value < 100 && colors.value != "") { //condition si la valeur est compris entre 0 ET 100 

        var productOptions = { //recupere le contenu des variables des details du produit
            id: productId,
            color: colors.value,
            quantity: quantity.value,
            
        }
            window.location.href ="cart.html"
    } 
    else {
        alert("Veuillez remplir tout les champs !!!");
    } 
    
    //------------local storage-----------------
    let localStorageContent = JSON.parse(localStorage.getItem("product")); //convertit au format json


    const addLocalStorageContent = () => { //fonction qui injecte et convertit le contenu de la variable productOption en string dans le local storage

        localStorageContent.push(productOptions);
        
        localStorage.setItem("product", JSON.stringify(localStorageContent));
    }

    if (localStorageContent) {

        addLocalStorageContent();
        console.log(localStorageContent);


    } else {

        localStorageContent = [];
        addLocalStorageContent()
        console.log(localStorageContent);

    };

})