"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
let mainWrapper = document.createElement('div');
mainWrapper.classList.add("mainWrapper");
(_a = document.querySelector(`body`)) === null || _a === void 0 ? void 0 : _a.append(mainWrapper);
let cart = [];
let products = [];
function getProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        let productsResponse = yield fetch(`https://fakestoreapi.com/products`);
        let productsData = yield productsResponse.json();
        return productsData;
    });
}
function renderCards() {
    return __awaiter(this, void 0, void 0, function* () {
        products = yield getProducts();
        products.map((product) => {
            let productItem = document.createElement(`div`);
            let addToCart = document.createElement(`input`);
            let image = document.createElement(`div`);
            let textArea = document.createElement(`div`);
            let priceNButton = document.createElement(`div`);
            let title = document.createElement(`h4`);
            let price = document.createElement(`h4`);
            let description = document.createElement(`p`);
            let category = document.createElement(`span`);
            image.style = ` background-image: url(${product.image});
                    `;
            productItem.classList.add(`productWrapper`);
            priceNButton.classList.add(`priceNButton`);
            image.classList.add(`imgs`);
            title.textContent = product.title;
            price.textContent = `${product.price}$`;
            category.textContent = product.category;
            description.textContent = product.description;
            addToCart.setAttribute(`type`, `button`);
            addToCart.setAttribute(`value`, `Add to Cart`);
            addToCart.setAttribute(`id`, `${product.id}`);
            textArea.classList.add(`textItem`);
            mainWrapper.append(productItem);
            productItem.prepend(image);
            priceNButton.append(price, addToCart);
            textArea.append(title, priceNButton, category, description);
            productItem.append(textArea);
            addToCart.addEventListener(`click`, e => {
                addToCRT(e);
                console.log(cart);
            });
        });
    });
}
renderCards();
function addToCRT(e) {
    const id = Number(e.target.id);
    const current = products.find(x => x.id === id);
    const inCart = cart.find(x => x.id === id);
    console.log(inCart);
    if (inCart) {
        const index = cart.findIndex(x => x.id === id);
        cart[index].quantity++;
    }
    else {
        current.quantity = 1;
        cart.push(current);
    }
    countCart();
    pricer();
    toLocalStorage();
}
function countCart() {
    var _a;
    let quantityCounter = 0;
    cart.map((x) => {
        quantityCounter += x.quantity;
    });
    //@ts-ignore
    (_a = document.querySelector(`.cart`)) === null || _a === void 0 ? void 0 : _a.textContent = `Items in cart ${quantityCounter}`;
}
function pricer() {
    var _a;
    let totalPrice = 0;
    cart.map((x) => {
        totalPrice += Number((x.price * x.quantity).toFixed(2));
    });
    //@ts-ignore
    (_a = document.querySelector(`.price`)) === null || _a === void 0 ? void 0 : _a.textContent = `Total price ${totalPrice} $`;
}
function toLocalStorage() {
    const cartJson = JSON.stringify(cart);
    localStorage.setItem(`shopCart`, `${cartJson}`);
}
