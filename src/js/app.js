import {settings, select} from './settings.js';
import Product from './Product.js';
import Cart from './Cart.js';

const app = {
  initMenu: function() {
    const thisApp = this;
    // console.log('thisApp.data:', thisApp.data);

    for (let productData in thisApp.data.products){
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },
  
  initData: function(){
    const thisApp = this;
    
    const url = settings.db.url + '/' + settings.db.products;

    thisApp.data = {};

    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        // console.log('parsedResponse', parsedResponse);

        thisApp.data.products = parsedResponse;         /* save parsedResponse as thisApp.data.products */

        thisApp.initMenu();                             /* execute initMenu method */
      });
    // console.log('thisApp.data', JSON.stringify(thisApp.data));
  },

  initCart: function () {
    const thisApp = this;

    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);

    thisApp.productList = document.querySelector(select.containerOf.menu);

    thisApp.productList.addEventListener('add-to-cart', function(event) {
      app.cart.add(event.detail.product);
    });
  },

  init: function(){
    const thisApp = this;
    
    // console.log('*** App starting ***');
    // console.log('thisApp:', thisApp);
    // console.log('classNames:', classNames);
    // console.log('settings:', settings);
    // console.log('templates:', templates);

    thisApp.initData();
    thisApp.initCart();
  },
};

app.init();

export default app;
