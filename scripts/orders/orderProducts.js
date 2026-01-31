import { orders } from "../../data/orders.js";
import {getProduct} from "../../data/products.js";
import {formatDate} from "../utils/time.js";
import {cart} from '../../data/cart-class.js';

export function renderOrderProducts() {

  orders.orderItems.forEach(order => {

    let html = '';

    order.products.forEach(orderProduct => {

      // console.log(orderProduct.productId);
      let product = getProduct(orderProduct.productId);

      html += `
        <div class="product-image-container">
          <img src= ${product.image}>
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${formatDate(orderProduct.estimatedDeliveryTime)}
          </div>
          <div class="product-quantity">
            Quantity: ${orderProduct.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button"
          data-product-id = "${orderProduct.productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>

      `;
    });

    document.querySelector(`.js-order-details-${order.id}`)
        .innerHTML = html;
  });

  document.querySelector('.js-cart-quantity')
    .innerHTML = cart.getCartQty();

  document.querySelectorAll(".js-buy-again-button")
    .forEach((button) => {
      button.addEventListener('click', () => {
        const {productId} = button.dataset;
        cart.addToCart(productId, 1);

        renderOrderProducts();
      })
    })

}