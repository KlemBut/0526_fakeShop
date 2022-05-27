var _a;
var mainWrap = document.createElement('div');
mainWrap.classList.add("mainWrapper");
(_a = document.querySelector("body")) === null || _a === void 0 ? void 0 : _a.append(mainWrap);
// interface parsedCartItems 
console.log(localStorage.getItem("shopCart"));
var cartData = localStorage.getItem("shopCart");
var parsedCart = JSON.parse(cartData);
var priceElement = document.querySelector(".price");
var totalPrice = 0;
console.log(parsedCart);
parsedCart.map(function (product) {
    var productItem = document.createElement("div");
    var image = document.createElement("div");
    var textArea = document.createElement("div");
    var priceNQuant = document.createElement("div");
    var addButton = document.createElement("input");
    var removeButton = document.createElement("input");
    var title = document.createElement("h4");
    var price = document.createElement("h4");
    var quantity = document.createElement("span");
    image.style = " background-image: url(".concat(product.image, ");\n                    ");
    productItem.classList.add("productWrapper");
    priceNQuant.classList.add("priceNQuant");
    image.classList.add("imgs");
    title.textContent = product.title;
    price.textContent = "".concat(product.price * product.quantity, "$");
    quantity.textContent = "Quantity: ".concat(product.quantity);
    addButton.setAttribute("type", "button");
    addButton.setAttribute("value", "+");
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("value", "-");
    textArea.classList.add("textItem");
    mainWrap.append(productItem);
    productItem.prepend(image);
    priceNQuant.append(price, removeButton, addButton);
    textArea.append(title, priceNQuant, quantity);
    productItem.append(textArea);
    addButton.addEventListener("click", function (e) {
        product.quantity++;
        price.textContent = "".concat(product.price * product.quantity, "$");
        quantity.textContent = "Quantity: ".concat(product.quantity);
        quantityToLocalStorage();
        renderTotalPrice();
    });
    removeButton.addEventListener("click", function (e) {
        if (product.quantity > 1) {
            product.quantity--;
            price.textContent = "".concat(product.price * product.quantity, "$");
            quantity.textContent = "Quantity: ".concat(product.quantity);
            console.log(parsedCart);
            quantityToLocalStorage();
            renderTotalPrice();
        }
        else {
            product.quantity--;
            productItem.remove();
            localStorageRemove(product.id);
            renderTotalPrice();
        }
    });
});
renderTotalPrice();
function localStorageRemove(productId) {
    var index = parsedCart.findIndex(function (x) { return x.id === productId; });
    console.log(parsedCart[index]);
    parsedCart.splice(index, 1);
    console.log(parsedCart);
    var cartJson = JSON.stringify(parsedCart);
    localStorage.setItem("shopCart", "".concat(cartJson));
}
function quantityToLocalStorage() {
    var cartJson = JSON.stringify(parsedCart);
    localStorage.setItem("shopCart", "".concat(cartJson));
}
function renderTotalPrice() {
    totalPrice = 0;
    parsedCart.map(function (product) {
        totalPrice += product.quantity * product.price;
    });
    priceElement.textContent = "Total price: ".concat(totalPrice);
}
