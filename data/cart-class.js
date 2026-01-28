import {deliveryOptions} from './deliveryOptions.js';

export class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey){       //setup code
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (this.cartIsEmpty()) {

      this.cartItems = [];
    }
  }

  resetCartFromStorage() {
    this.#loadFromStorage();
  }

  cartIsEmpty(){
    if (!this.cartItems) {
      return true;
    }
    else {
      return false;
    }
  }

  saveToStorage() {
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId, quantity){
          
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId){
          matchingItem = cartItem;
        }
      });

      if (matchingItem){
          matchingItem.quantity += quantity;
      } else {
          this.cartItems.push({
            productId,
            quantity,
            deliveryOptionId: '1'
          });
      }

      this.saveToStorage();

  }

  removeFromCart(productId) {

    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });

    if (this.cartItems.length !== newCart.length){
      this.cartItems = newCart;
      this.saveToStorage();
    }
  }

  getCartQty() {
    let cartQty = 0;

    this.cartItems.forEach((cartItem) => {
      cartQty += cartItem.quantity;
    });

    return cartQty;
  }

  updateQuantity(productId, newQty){
      
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId === productId){
        cartItem.quantity = newQty;
        this.saveToStorage();
      }
    });
  }

  updateDeliveryOption(productId, delOptId){

    let matchingItem;
    let matchingDeliveryID;

    deliveryOptions.forEach((deliveryOption) => {
      if(deliveryOption.id === delOptId){
        matchingDeliveryID = delOptId
      }
    });

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId){
        matchingItem = cartItem;
      }
    });


  if (matchingItem === undefined || matchingDeliveryID === undefined){
    return;
  }

    matchingItem.deliveryOptionId = matchingDeliveryID;

    this.saveToStorage();

  }
}

export const cart = new Cart('cart');
// const businessCart = new Cart('cart-business');

console.log(cart);

// why we need private methods in classes
//cart.#localStorageKey = 'smth_different';

// console.log(businessCart);
// console.log(businessCart instanceof Cart);