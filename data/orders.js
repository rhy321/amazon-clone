export class Orders {
  orderItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.orderItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.orderItems));
  }

  addOrder(order) {
    this.orderItems.unshift(order); //add order to the front of array, not back. returns new length.
    this.saveToStorage();
  }

}

export const orders = new Orders('orders');
console.log(orders);