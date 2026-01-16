export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [];
}


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
  const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        
        let matchingItem;

        cart.forEach((cartItem) => {
          if (cartItem.productId === productId){
            matchingItem = cartItem;
          }
        });

        if (matchingItem){
            matchingItem.quantity += quantity;
        } else {
            cart.push({
              productId,
              quantity
            });
        }

        saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();

}

export function getCartQty(){
  let cartQty = 0;

  cart.forEach((cartItem) => {
    cartQty += cartItem.quantity;
  });

  return cartQty;
}