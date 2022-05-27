let mainWrap = document.createElement('div') as HTMLElement;
mainWrap.classList.add("mainWrapper")
document.querySelector(`body`)?.append(mainWrap)

// interface parsedCartItems 
console.log(localStorage.getItem("shopCart"));
const cartData: string = localStorage.getItem("shopCart")
const parsedCart: ProductsInterface [] = JSON.parse(cartData)
let priceElement = document.querySelector(`.price`) as HTMLElement;
let totalPrice: number = 0
console.log(parsedCart);

parsedCart.map((product: ProductsInterface) => {
    let productItem = document.createElement(`div`) as HTMLElement;
    let image = document.createElement(`div`) as HTMLElement
    let textArea = document.createElement(`div`) as HTMLElement;
    let priceNQuant = document.createElement(`div`) as HTMLElement;
    let addButton = document.createElement(`input`) as HTMLElement
    let removeButton = document.createElement(`input`) as HTMLElement
    let title = document.createElement(`h4`) as HTMLElement
    let price = document.createElement(`h4`) as HTMLElement
    let quantity = document.createElement(`span`) as HTMLElement

    image.style = ` background-image: url(${product.image});
                    `   
    productItem.classList.add(`productWrapper`)
    priceNQuant.classList.add(`priceNQuant`)
    image.classList.add(`imgs`)
    title.textContent = product.title;
    price.textContent = `${product.price*product.quantity}$`;
    quantity.textContent = `Quantity: ${product.quantity}`;
    addButton.setAttribute(`type`, `button`)
    addButton.setAttribute(`value`, `+`)
    removeButton.setAttribute(`type`, `button`)
    removeButton.setAttribute(`value`, `-`)
    textArea.classList.add(`textItem`)


    mainWrap.append(productItem);
    productItem.prepend(image);
    priceNQuant.append(price, removeButton, addButton)
    textArea.append(title, priceNQuant, quantity, );
    productItem.append(textArea)

    addButton.addEventListener(`click`, e => {
        product.quantity++
        price.textContent = `${product.price*product.quantity}$`;
        quantity.textContent = `Quantity: ${product.quantity}`;
        quantityToLocalStorage ()
        renderTotalPrice()
    })
    removeButton.addEventListener(`click`, e => {
        if(product.quantity > 1){
            product.quantity--
            price.textContent = `${product.price*product.quantity}$`;
            quantity.textContent = `Quantity: ${product.quantity}`;
            console.log(parsedCart);
            quantityToLocalStorage ()
            renderTotalPrice()
        }   else {
            product.quantity--
            productItem.remove()
            localStorageRemove(product.id)
            renderTotalPrice()
        }
        
    })
})
renderTotalPrice()

function localStorageRemove (productId: number) {
    const index  = parsedCart.findIndex(x => x.id === productId)
    console.log(parsedCart[index])
    parsedCart.splice(index, 1)
    console.log(parsedCart)
     const cartJson = JSON.stringify(parsedCart)
    localStorage.setItem(`shopCart`, `${cartJson}`)
}
function quantityToLocalStorage () {
    const cartJson = JSON.stringify(parsedCart)
    localStorage.setItem(`shopCart`, `${cartJson}`)
}

function renderTotalPrice(){

    totalPrice = 0
    parsedCart.map(product => {
        totalPrice += product.quantity*product.price
    })
    priceElement.textContent = `Total price: ${totalPrice}`
}

