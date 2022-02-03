import {select} from './settings.js';
import AmountWidget from './AmountWidget.js';

class CartProduct{
  
  constructor(menuProduct, element) {
  
    const thisCartProduct = this;

    thisCartProduct.id = menuProduct.Id;
    thisCartProduct.amount = menuProduct.amount;
    thisCartProduct.priceSingle = menuProduct.priceSingle;
    thisCartProduct.price = menuProduct.price;

    thisCartProduct.getElements(element);
    thisCartProduct.initAmountWidget();
    thisCartProduct.initActions();
  }
  
  getElements(element){  
    
    const thisCartProduct = this;

    thisCartProduct.dom = {};
  
    thisCartProduct.dom.wrapper = element;

    thisCartProduct.dom.amountWidget = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.amountWidget);
    thisCartProduct.dom.price = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.price);
    thisCartProduct.dom.edit = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.edit);
    thisCartProduct.dom.remove = thisCartProduct.dom.wrapper.querySelector(select.cartProduct.remove);
  }

  initAmountWidget(){
    const thisCartProduct = this;

    thisCartProduct.amountWidget = new AmountWidget(thisCartProduct.dom.amountWidget);
    thisCartProduct.dom.amountWidget.addEventListener('updated', function(){
      thisCartProduct.price = thisCartProduct.priceSingle * thisCartProduct.amountWidget.value;
      thisCartProduct.dom.price.innerHTML = thisCartProduct.price;
    });
  }

  remove(){
    const thisCartProduct = this;

    const event = new CustomEvent('remove', {
      bubbles: true,
      detail: {
        cartProduct: thisCartProduct,
      },
    });
    
    thisCartProduct.dom.wrapper.dispatchEvent(event);
  }

  initActions(){
    const thisCartProduct = this;

    thisCartProduct.dom.edit.addEventListener('click', function (event){
      event.preventDefault();
    });

    thisCartProduct.dom.remove.addEventListener('click', function (event){
      event.preventDefault();
      thisCartProduct.remove();
    });
  }

  getData(){
    const thisCartProduct = this;
    
    const cartSummary = {};

    cartSummary.id = thisCartProduct.id;
    cartSummary.name = thisCartProduct.name;
    cartSummary.amount = thisCartProduct.amount;
    cartSummary.priceSingle = thisCartProduct.priceSingle;
    cartSummary.price = thisCartProduct.price;
    cartSummary.params = thisCartProduct.params;
    
    return cartSummary;
  }
}

export default CartProduct;