// import {cart} from '../../data/cart.js';
import {cart} from '../../data/cart-class.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import formatCurrency from '../utils/money.js';
import {orders} from '../../data/orders.js'


export function renderPaymentSummary() {

  let productPriceCents = 0;
  let shippingPriceCents = 0;
  const qty = cart.getCartQty();

  cart.cartItems.forEach(cartItem => {

    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const TotalBeforeTaxCents = shippingPriceCents + productPriceCents;

  const TaxCents = (TotalBeforeTaxCents * 0.1) // 10% of price

  const TotalCents = TotalBeforeTaxCents + TaxCents; 

  const paymentSummaryHtml = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${qty}):</div>
      <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-payment-shipping-money">$${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(TotalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(TaxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-payment-summary-total">$${formatCurrency(TotalCents)}</div>
    </div>

    <button class="place-order-button button-primary
      js-place-order">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHtml;


  checkIfEmpty();

  function checkIfEmpty() {
    const orderBtn = document.querySelector('.js-place-order');
    if ( cart.cartIsEmpty() ) {
      if (!orderBtn.classList.contains('place-order-disabled')){
        orderBtn.classList.add('place-order-disabled');
        orderBtn.setAttribute('disabled', true);
      }
    } else {
      if (orderBtn.classList.contains('place-order-disabled')){
        orderBtn.classList.remove('place-order-disabled');
        orderBtn.setAttribute('disabled', false);

      }
    }
  }


  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {

      try {

        const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart.cartItems
        })
      });

      const order = await response.json();
      orders.addOrder(order);
      cart.emptyCart();
      
      } catch (error) {
        console.log('Unexpected error. Try again later');
      }
      
      window.location.href = 'orders.html';
    });

}