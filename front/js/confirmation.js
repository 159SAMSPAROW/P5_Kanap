/************* Récupération de l'orderID et affichage du numéro de commande ************ */

/*const urlParam = (new URL(location)).searchParams;
const orderId = urlParam.get("orderId");
console.log(orderId);*/


let orderId = window.location.search;
console.log(orderId);

//const theOrderId = orderId.slice(4)

// Vide toutes les clés stockées dans le localStorage

const urlSearchParams = new URLSearchParams(orderId);
console.log(urlSearchParams);

const leId = urlSearchParams.get("id");
console.log(leId);
document.getElementById("orderId").innerHTML += `${leId}`;
//localStorage.clear();