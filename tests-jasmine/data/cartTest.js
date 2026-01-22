import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () => {
  // it('adds an existing product to cart', () => {
  //   addToCart('');
  // });

  it('adds a new product to cart', () => {

    //so that addToCart doesn't save to storage
    spyOn(localStorage, 'setItem');

    //so that cart is empty
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1); //only works cuz the method was marked with spyOn
  });

});