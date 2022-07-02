const storage = localStorage;

function saveCart(products) {
    localStorage.setItem("productCart", JSON.stringify(products));
}

function getCart() {
    let productCart = localStorage.getItem("productCart");

    if (cart == null) {
        return [];
    } else {
        return JSON.parse(productCart);
    }
}

function addToCart(product) {

    let productCart = getCart();
    productCart.push(product);
    saveCart(productCart);
}