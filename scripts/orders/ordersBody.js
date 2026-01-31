import { orders } from "../../data/orders.js";
import {formatDate} from "../utils/time.js";
import {formatCurrency} from "../utils/money.js";

export function renderOrders() {

  let ordersHtml = '';

  console.log(orders.orderItems);

  orders.orderItems.forEach(order => {

    let orderId = order.id ;
    
    ordersHtml += `
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formatDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderId}</div>
            </div>
          </div>

          <div class="order-details-grid js-order-details-${orderId}"> 
          
          </div>
        </div>

    `;

    document.querySelector('.js-orders-grid')
      .innerHTML = ordersHtml;

  });

}