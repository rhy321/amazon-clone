class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey){       //setup code
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (!this.cartItems) {

      // cart = [];
      this.cartItems = [{
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

  saveToStorage() {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
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

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId){
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = delOptId;

    this.saveToStorage();

  }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

cart.addToCart('19c6a64a-5463-4d45-9af8-e41140a4100c', 1);
console.log(cart);


console.log(businessCart);
console.log(businessCart instanceof Cart);