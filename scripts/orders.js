import { renderOrders } from "./orders/ordersBody.js";
import {renderOrderProducts} from "./orders/orderProducts.js"
import { loadProductsFetch } from "../data/products.js";

async function loadPage() {

  try {
    await loadProductsFetch();
  } catch (error) {
    console.log('Unexpected error... Please try again later.');
    console.log(error);
  }

  renderOrders();
  renderOrderProducts();
}

loadPage();