// Récupération de l'orderID et affichage du numéro de commande

let orderId = window.location.search;
const urlSearchParams = new URLSearchParams(orderId);
const OrderId = urlSearchParams.get("id");

document.getElementById("orderId").innerHTML += `${OrderId}`;
localStorage.clear();