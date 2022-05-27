let mainWrapper = document.createElement('div') as HTMLElement;
mainWrapper.classList.add("mainWrapper")
document.querySelector(`body`)?.append(mainWrapper)

interface ProductsInterface {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number
}
let cart: ProductsInterface [] = []
let products: ProductsInterface[] = []
async function getProducts () {
    let productsResponse = await fetch(`https://fakestoreapi.com/products`);
    let productsData: ProductsInterface[] = await productsResponse.json();
    return productsData
}
async function renderCards () {
products = await getProducts()

products.map((product: ProductsInterface) => {
    let productItem = document.createElement(`div`) as HTMLElement;
    let addToCart = document.createElement(`input`)
    let image = document.createElement(`div`) as HTMLElement
    let textArea = document.createElement(`div`) as HTMLElement;
    let priceNButton = document.createElement(`div`) as HTMLElement;
    let title = document.createElement(`h4`) as HTMLElement
    let price = document.createElement(`h4`) as HTMLElement
    let description = document.createElement(`p`) as HTMLElement
    let category = document.createElement(`span`) as HTMLElement

    image.style = ` background-image: url(${product.image});
                    `   
    productItem.classList.add(`productWrapper`)
    priceNButton.classList.add(`priceNButton`)
    image.classList.add(`imgs`)
    title.textContent = product.title;
    price.textContent = `${product.price}$`;
    category.textContent = product.category;
    description.textContent = product.description;
    addToCart.setAttribute(`type`, `button`);
    addToCart.setAttribute(`value`, `Add to Cart`)
    addToCart.setAttribute(`id`, `${product.id}`)
    textArea.classList.add(`textItem`)


    mainWrapper.append(productItem);
    productItem.prepend(image);
    priceNButton.append(price, addToCart)
    textArea.append(title, priceNButton, category, description);
    productItem.append(textArea)

    addToCart.addEventListener(`click`, e => {
        addToCRT(e)
        console.log(cart);
    })
})
}
renderCards()

function addToCRT ( e:any) {
    const id = Number(e.target.id)
    const current:ProductsInterface = products.find(x => x.id === id)
    const inCart = cart.find(x => x.id === id)

    console.log(inCart);
    if (inCart) {
        const index  = cart.findIndex(x => x.id === id)
        cart[index].quantity++
    }else {
        current.quantity = 1;
        cart.push(current)
    }

    countCart()
    pricer()
    toLocalStorage()
}

function countCart () {
    let quantityCounter = 0
    cart.map((x:ProductsInterface) => {
        quantityCounter += x.quantity
    })
    //@ts-ignore
    document.querySelector(`.cart`)?.textContent = `Items in cart ${quantityCounter}`
}

function pricer () {
    let totalPrice = 0
    cart.map((x:ProductsInterface) => {
        totalPrice += x.price * x.quantity
    })
    //@ts-ignore
    document.querySelector(`.price`)?.textContent = `Total price ${totalPrice.toFixed(2)} $`
}
function toLocalStorage () {
    const cartJson = JSON.stringify(cart)
    localStorage.setItem(`shopCart`, `${cartJson}`)
}