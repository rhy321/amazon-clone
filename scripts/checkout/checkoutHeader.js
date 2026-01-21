import {getCartQty} from '../../data/cart.js';

export function renderCheckoutHeader(){
  document.querySelector('.js-return-to-home-link')
    .innerHTML = (`${getCartQty()} items`);
}