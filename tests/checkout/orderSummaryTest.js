import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";


//intergration tests

describe('Test Suite: renderOrderSummary',() => {

  const prodId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const prodId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

  beforeEach(() => {
    //removefromcart saves to storage which isn't rly nice here so..
    spyOn(localStorage, 'setItem')

    document.querySelector('.js-test-container').innerHTML = `
      <div class = "js-order-summary"></div>
      <div class = "js-payment-summary"></div>
      <div class = "js-return-to-home-link"></div
    `;

    //get a fake cart
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '2'
        },{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '3'
      }]);
    });
    
    loadFromStorage();
    renderOrderSummary();
  });

  it('displays the cart', () => {
   
    //expect returns an object
    expect(
      document.querySelectorAll('.js-cart-item-container').length //array of elements ka length
    ).toEqual(2);

    expect((document.querySelector(`.js-product-quantity-${prodId1}`)).innerText).toContain('Quantity: 2');

    expect((document.querySelector(`.js-product-quantity-${prodId2}`)).innerText).toContain('Quantity: 1');

  });

  it('removes a product', () => {

    document.querySelector(`.js-delete-link-${prodId1}`).click();

    expect(document.querySelectorAll('.js-cart-item-container').length ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${prodId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${prodId2}`)
    ).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(prodId2);
    
  });

  it('updates delivery option', () => {
    document.querySelector(`.js-delivery-option-${prodId1}-3`).click();

    expect(document.querySelector(`.delivery-option-input-${prodId1}-3`).checked).toEqual(true);

    expect(cart.length).toEqual(2);

    expect(cart[0].productId).toEqual(prodId1);
    expect(cart[0].deliveryOptionId).toEqual('3');

    expect(document.querySelector('.js-payment-shipping-money').innerText).toContain('19.98');

    expect(document.querySelector('.js-payment-summary-total').innerText).toContain('69.00');
  });

  // afterEach(() => {
  //   document.querySelector('.js-test-container').innerHTML = ``;
  // })
});