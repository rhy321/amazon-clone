// import {getCartQty} from '../../data/cart.js';
import {cart} from '../../data/cart-class.js';

export function renderCheckoutHeader(){
  document.querySelector('.js-return-to-home-link')
    .innerHTML = (`${cart.getCartQty()} items`);
}