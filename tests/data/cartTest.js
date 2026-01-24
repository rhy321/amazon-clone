import {addToCart, cart, loadFromStorage, removeFromCart} from '../../data/cart.js';

describe('test suite: addToCart', () => {

  it('adds an existing product to cart', () => {

    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.length).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1); //only works cuz the method was marked with spyOn

    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
  });


  it('adds a new product to cart', () => {

    //so that addToCart doesn't save to storage
    spyOn(localStorage, 'setItem');

    //so that cart is empty
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart.length).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1); //only works cuz the method was marked with spyOn

    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));

  });

})

describe('test suite: removeFromCart', () => {

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

    loadFromStorage();
  });

  it('remove a product in the cart', () => {
   
    removeFromCart(p1);

    expect(cart[0].productId).toEqual(p2);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

  });

  it('remove a product not in the cart', () => {

    removeFromCart("bleh");

    expect(cart.length).toEqual(2);

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);

  });
});