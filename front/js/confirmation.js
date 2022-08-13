// Récupération de l'orderID et affichage du numéro de commande

let orderId = window.location.search;// On récupère l' url de la page
const urlSearchParams = new URLSearchParams(orderId);// Création d' un object pour rechercher l' id
const OrderId = urlSearchParams.get("id");// Récupération de l' id

document.getElementById("orderId").innerHTML += `${OrderId}`;// Injection de l' orderId dans le html 
localStorage.clear();