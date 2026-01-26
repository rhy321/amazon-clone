export let cart; //export let cart = undefined;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {

    // cart = [];
    cart = [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 3,
      deliveryOptionId: '3'
    }];
  }
}


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity){
        
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
          quantity,
          deliveryOptionId: '1'
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

  if (cart.length !== newCart.length){
    cart = newCart;
    saveToStorage();
  }
}

export function getCartQty() {
  let cartQty = 0;

  cart.forEach((cartItem) => {
    cartQty += cartItem.quantity;
  });

  return cartQty;
}

export function updateQuantity(productId, newQty){
    
  cart.forEach((cartItem) => {
    if(cartItem.productId === productId){
      console.log(cartItem.quantity);
      cartItem.quantity = newQty;
      console.log(cartItem.quantity);
      saveToStorage();
    }
  });
}


export function updateDeliveryOption(productId, delOptId){

  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId){
      matchingItem = cartItem;
    }
   });

   if (matchingItem === undefined){
    return;
   }

   matchingItem.deliveryOptionId = delOptId;

   saveToStorage();

}