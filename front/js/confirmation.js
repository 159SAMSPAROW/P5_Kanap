// Récupération de l'orderID et affichage du numéro de commande

let orderId = window.location.search;
const urlSearchParams = new URLSearchParams(orderId);
const leId = urlSearchParams.get("id");

document.getElementById("orderId").innerHTML += `${leId}`;
localStorage.clear();