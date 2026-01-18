// {} -> named export
import {cart, removeFromCart, getCartQty, updateQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
//utils is in current folder so use one .
import {formatCurrency} from './utils/money.js'
import {deliveryOptions} from '../data/deliveryOptions.js';


//ESM module external library... default export to export only one thing from a file
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';



//external library learning
// hello();
const today = (dayjs());
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D')); //check dayjs website for functions



let cartSummaryHtml = '';

cart.forEach((cartItem) => {

  const productId = cartItem.productId;


  let matchingProduct;

  products.forEach((product) => {
    if (productId === product.id){
      matchingProduct = product;
    }
  });


  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === cartItem.deliveryOptionId) {
      deliveryOption = option;  //saves an object (option) from deliveryOptions.js
    }
  });
   
  cartSummaryHtml += `
      <div class="cart-item-container js-cart-item-container-${productId}">
      <div class="delivery-date">
        Delivery date: ${formatDate(deliveryOption)}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: 
                <span class="quantity-label js-quantity-label-${productId}">
                  ${cartItem.quantity}
                </span>
            </span>
            
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id = "${productId}">
              Update
            </span>

            <input type="number" min = "1" max = "1000" value = "${cartItem.quantity}" class = "quantity-input js-quantity-input" data-product-id = "${productId}" data-role = "quantityInput" >

            <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id = "${productId}" >
              Save
            </span>

            <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id = "${productId}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          
          ${deliveryOptionsHTML(productId, cartItem)}

        </div>
      </div>
    </div>
  `;
});

function formatDate(deliveryOption){
  const today = dayjs();   
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );
  return dateString;
}

function deliveryOptionsHTML(productId, cartItem) {

  let deliveryHtml = '';

  deliveryOptions.forEach((deliveryOption) => {
    
    const dateString = formatDate(deliveryOption);

    const priceString = deliveryOption.priceCents === 0 
      ? 'FREE'      //if condition is true
      : `$${formatCurrency(deliveryOption.priceCents)} -`; //elif false

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId

    deliveryHtml += `
      <div class="delivery-option">
        <input type="radio" ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
    `
  });
  return deliveryHtml;
}

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHtml;

document.querySelectorAll(".js-update-quantity-link")
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      document.querySelector(`.js-cart-item-container-${productId}`)
        .classList.add('is-editing-quantity');
    });
  });

document.querySelectorAll('.js-save-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      updateSave(link)
    });
  });

document.querySelectorAll('.js-quantity-input')
  .forEach((inputBox) => {
    inputBox.addEventListener('keydown', (k) => {
      if (k.key === 'Enter'){
        updateSave(inputBox);
      }
    });
  })


document.querySelectorAll('.js-delete-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      
      document.querySelector('.js-return-to-home-link')
        .innerHTML = (`${getCartQty()} items`);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);

      container.remove();
    });
  });

document.querySelector('.js-return-to-home-link')
  .innerHTML = (`${getCartQty()} items`);


  function updateSave(link) {
      const {productId} = link.dataset;

      const newQty = Number(document.querySelector(`[data-product-id = "${productId}"][data-role = "quantityInput"]`).value);

      if (newQty > 0 && newQty < 1000){
        updateQuantity(productId, newQty);

        document.querySelector(`.js-cart-item-container-${productId}`)
          .classList.remove('is-editing-quantity');

        document.querySelector('.js-return-to-home-link')
          .innerHTML = (`${getCartQty()} items`);

        document.querySelector(`.js-quantity-label-${productId}`)
          .innerHTML = newQty;
      }

      else {
        alert('Invalid Quantity');
      }
  }