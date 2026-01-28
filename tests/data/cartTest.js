// import {addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption} from '../../data/cart.js';

import {Cart} from '../../data/cart-class.js';

describe('test suite: addToCart', () => {

  let cart;

  beforeEach(() => {
    //so that addToCart doesn't save to storage
    spyOn(localStorage, 'setItem');

    // cart.resetCartFromStorage();

  });

  it('adds an existing product to cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    cart = new Cart('cart-test');

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.cartItems.length).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1); //only works cuz the method was marked with spyOn

    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart-test', JSON.stringify(cart.cartItems));
  });


  it('adds a new product to cart', () => {

    //so that cart is empty
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    cart = new Cart('cart-test');

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.cartItems.length).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1); //only works cuz the method was marked with spyOn

    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart-test', JSON.stringify(cart.cartItems));

  });

})

describe('test suite: removeFromCart', () => {

  let cart;
  const p1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const p2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 3,
        deliveryOptionId: '3'
      }]);
    });

    // cart.resetCartFromStorage();

    cart = new Cart('cart-test');
  });

  it('remove a product in the cart', () => {
   
    cart.removeFromCart(p1);

    expect(cart.cartItems[0].productId).toEqual(p2);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart-test', JSON.stringify(cart.cartItems));

    expect(localStorage.setItem).toHaveBeenCalledWith('cart-test', JSON.stringify(cart.cartItems));

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

  });

  it('remove a product not in the cart', () => {

    cart.removeFromCart("bleh");

    expect(cart.cartItems.length).toEqual(2);

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);

  });
});



describe('test suite: updateDeliveryOption', () => {

  let cart;
  const prod1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const prod2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeEach(() => {

    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 3,
          deliveryOptionId: '3'
        }
      ]);
    });
    cart = new Cart('cart-test');

  });

  it('updates delivery option in cart', () => {
    cart.updateDeliveryOption(prod2, '2');

    expect(cart.cartItems[1].deliveryOptionId).toEqual('2');

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('does not update cart for product not in cart', () => {

    const oldCart = cart.cartItems.slice();

    cart.updateDeliveryOption("some_other_id", '1');

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(cart.cartItems).toEqual(oldCart);
  });

  it('does not update cart for Delivery ID doesn\'t exist', () => {

    const oldCart = cart.cartItems.slice();
    
    cart.updateDeliveryOption(prod1, '4');

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(cart.cartItems).toEqual(oldCart);
  });
});