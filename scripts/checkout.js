import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js'
import { /*loadProducts,*/ loadProductsFetch } from '../data/products.js';
// import { loadCart } from '../data/cart.js';
// import '../data/cart-oop.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js'; 


async function loadPage() {

  try {

    // throw 'error1';

    await loadProductsFetch();

    // const value = await new Promise((resolve, reject) => {
    //   // throw 'error2';
    //   loadCart(() => {
    //     // reject('error3');
    //     resolve('value3');
    //   });
    // });

    // console.log(value); // value3

  } catch (error) {
    console.log('Unexpected error... Please try again later.');
    console.log(error);
  }


  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}

loadPage();



/*
Promise.all([
  loadProductsFetch(),

  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
});
*/

/*

// using xml
Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('value1');
    });
  }),

  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
});

*/

/* 

new Promise((resolve) => {
  console.log('start promise');
  loadProducts(() => {
    console.log('finish loading');
    resolve('value1');
  });

}).then((value) => {                // value = value1
  return new Promise((resolve) => {
    console.log('next step');
    console.log(value);
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
    console.log('final step, render page');
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
});

*/




/*

// callbacks (issues)

loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  });
});

*/