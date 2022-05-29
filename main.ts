let mainWrapper = document.createElement("div") as HTMLElement;
mainWrapper.classList.add("mainWrapper");
document.querySelector(`body`)?.append(mainWrapper);

// Interface for products objects

interface ProductsInterface {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
}

// Emprty variables for cart and all products

let cart: ProductsInterface[] = [];
let products: ProductsInterface[] = [];



async function getProducts(): Promise<ProductsInterface[]> {
  let productsResponse = await fetch(`https://fakestoreapi.com/products`);
  let productsData: ProductsInterface[] = await productsResponse.json();
  return productsData;
}

// Rendering all products cards from getProducts function

async function renderCards() {
  products = await getProducts();

  products.map((product: ProductsInterface) => {

// Creating all HTML elements

    let productItem = document.createElement(`div`) as HTMLElement;
    let addToCart = document.createElement(`input`) as HTMLButtonElement;
    let image = document.createElement(`div`) as HTMLElement;
    let textArea = document.createElement(`div`) as HTMLElement;
    let priceNButton = document.createElement(`div`) as HTMLElement;
    let title = document.createElement(`h4`) as HTMLElement;
    let price = document.createElement(`h4`) as HTMLElement;
    let description = document.createElement(`p`) as HTMLElement;
    let category = document.createElement(`span`) as HTMLElement;

//Adding bg image for product cards
    //@ts-ignore
    image.style = ` background-image: url(${product.image})`;

// Adding text, classes and attributes to HTML elements

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

// Appending the elements

    mainWrapper.append(productItem);
    productItem.prepend(image);
    priceNButton.append(price, addToCart);
    textArea.append(title, priceNButton, category, description);
    productItem.append(textArea);

    addToCart.addEventListener(`click`, (e) => {
      addToCRT(e);
      console.log(cart);
    });
  });
}
renderCards();

// function for add to cart button

function addToCRT(e: any): void {
  const id: number = Number(e.target.id);
  const current: ProductsInterface = products.find((x) => x.id === id);
  const inCart: ProductsInterface | undefined  = cart.find((x) => x.id === id);

  if (inCart) {
    const index: number = cart.findIndex((x) => x.id === id);
    cart[index].quantity++;
  } else {
    current.quantity = 1;
    cart.push(current);
  }

  countCart();
  pricer();
  toLocalStorage();
}

// function to update element with quantity if items in cart0

function countCart(): void {
  let quantityCounter: number = 0;
  cart.map((x: ProductsInterface) => {
    quantityCounter += x.quantity;
  });
  //@ts-ignore
  document.querySelector(
    `.cart`
  )?.textContent = `Items in cart ${quantityCounter}`;
}

//  function to add item price to total price

function pricer(): void {
  let totalPrice: number = 0;
  cart.map((x: ProductsInterface) => {
    totalPrice += x.price * x.quantity;
  });
  //@ts-ignore
  document.querySelector(
    `.price`
  )?.textContent = `Total price ${totalPrice.toFixed(2)} $`;
}
function toLocalStorage(): void {
  const cartJson: string = JSON.stringify(cart);
  localStorage.setItem(`shopCart`, `${cartJson}`);
}
