//1. save + load data
//2. generate the html
//3. Make it interactive

// import {cart as myCart} from '../data/cart.js';
import {addToCart, getCartQty} from '../data/cart.js';
// import * from '../data/cart.js';

import {products, loadProducts} from '../data/products.js';

// import { formatCurrency } from './utils/money.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {

  let productHtml = '';
  let timeoutId;

  updateCartQty();

  products.forEach((product) => {

    productHtml += `
        <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src=${product.getStarsUrl()}>
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              $${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class = "js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHtml()}

            <div class="product-spacer"></div>

            <div class="js-added-to-cart-${product.id} added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id = "${product.id}">
              Add to Cart
            </button>
        </div>
    `;

    
  });


  function addedConfirmation(productId){
    const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`);

    if (!addedToCart.classList.contains('toggle-on')){
      addedToCart.classList.add('toggle-on');
    }

    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      addedToCart.classList.remove('toggle-on');
    }, 2000);
  }

  function updateCartQty(){

    document.querySelector('.js-cart-quantity')
      .innerHTML = getCartQty();
  }

  document.querySelector('.js-products-grid')
    .innerHTML = productHtml;

  document.querySelectorAll('.js-add-to-cart')
    .forEach((addToCartButton) => {
      addToCartButton.addEventListener('click', () => {
          //const productId= addToCartButton.dataset.productId;
          const {productId}= addToCartButton.dataset;

          const quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

          addToCart(productId, quantity);
          addedConfirmation(productId);
          updateCartQty();

          //console.log(cart);

      });
    });
}