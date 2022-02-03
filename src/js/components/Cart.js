import {settings, select, classNames, templates} from './settings.js';
import utils from './utils.js';
import CartProduct from './CartProduct.js';

class Cart{
  constructor(element){
    
    const thisCart = this;

    thisCart.products = [];

    thisCart.getElements(element);
    thisCart.initActions();
  }

  getElements(element){
    const thisCart = this;

    thisCart.dom = {};

    thisCart.dom.wrapper = element;
    thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(select.cart.toggleTrigger);
    thisCart.dom.productList = thisCart.dom.wrapper.querySelector(select.cart.productList);
    thisCart.dom.deliveryFee = thisCart.dom.wrapper.querySelector(select.cart.deliveryFee);
    thisCart.dom.subtotalPrice = thisCart.dom.wrapper.querySelector(select.cart.subtotalPrice);
    thisCart.dom.totalPrice = thisCart.dom.wrapper.querySelector(select.cart.totalPrice);
    thisCart.dom.totalPriceBottom = thisCart.dom.wrapper.querySelector(select.cart.totalPriceBottom); 
    thisCart.dom.totalNumber = thisCart.dom.wrapper.querySelector(select.cart.totalNumber);
    thisCart.dom.form = thisCart.dom.wrapper.querySelector(select.cart.form);
    thisCart.dom.address = thisCart.dom.wrapper.querySelector(select.cart.address);
    thisCart.dom.phone = thisCart.dom.wrapper.querySelector(select.cart.phone);
  }
  
  initActions(){

    const thisCart = this;

    thisCart.dom.toggleTrigger.addEventListener('click', function () {
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });
    thisCart.dom.productList.addEventListener('click', function() {
      thisCart.update();
    });
    thisCart.dom.productList.addEventListener('remove', function(event) {
      thisCart.remove(event.detail.cartProduct);
    });
    thisCart.dom.form.addEventListener('submit', function(event) {
      event.preventDefault();
      thisCart.sendOrder();
    });
  }
  
  sendOrder(){
    const thisCart = this;

    const url = settings.db.url + '/' + settings.db.orders;

    const payLoad = {};

    payLoad.address = thisCart.dom.address.value;
    payLoad.phone = thisCart.dom.phone.value;
    payLoad.totalPrice = thisCart.totalPrice;
    payLoad.subtotalPrice = thisCart.subtotalPrice;
    payLoad.totalNumber = thisCart.totalNumber;
    payLoad.deliveryFee = thisCart.deliveryFee;
    payLoad.products = [];

    for(let prod of thisCart.products) {
      payLoad.products.push(prod.getData());
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payLoad),
    };
    
    fetch(url, options);
    console.log('thisApp.data', payLoad);
  }
  
  add(menuProduct){
    const thisCart = this;
    /* generate HTML based on template */
    const generatedHTML = templates.cartProduct(menuProduct);

    /* create element using utils.createElementFromHTML */
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);

    /* find menu container */
    thisCart.dom.productList.appendChild(generatedDOM);
    
    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
    thisCart.update();
  }

  update (){
    const thisCart = this;
    
    const deliveryFee = settings.cart.defaultDeliveryFee;

    let totalNumber = 0; // represents total quantity
    let subtotalPrice = 0; // represents sum of all products without delivery fee

    for (let product of thisCart.products) {
      totalNumber += product.amount;
      subtotalPrice += product.price;
    }

    if (totalNumber == 0) {
      thisCart.totalPrice = 0;
    } else {
      thisCart.totalPrice = subtotalPrice + deliveryFee;
      thisCart.dom.deliveryFee.innerHTML = deliveryFee;
      thisCart.dom.subtotalPrice.innerHTML = subtotalPrice;
      thisCart.dom.totalNumber.innerHTML = totalNumber;
      thisCart.dom.totalPrice.innerHTML = thisCart.totalPrice;
      thisCart.dom.totalPriceBottom.innerHTML = thisCart.totalPrice;
    }
  }

  remove (cartProduct){
    const thisCart = this;

    thisCart.products.splice(thisCart.products.indexOf(cartProduct), 1);
    thisCart.update();
    cartProduct.dom.wrapper.remove();
  }
}

export default Cart;