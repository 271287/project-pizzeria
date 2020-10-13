/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      menuProduct: '#template-menu-product',
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
  };

  const settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 1,
      defaultMax: 9,
    }
  };

  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
  };

  class Product {
    constructor(id, data) {
      const thisProduct = this;
      thisProduct.id = id;
      thisProduct.data = data;
      thisProduct.renderInMenu();
      thisProduct.accordionTrigger();
      thisProduct.form();
      thisProduct.formInputs();
      thisProduct.cartButton();
      thisProduct.priceElem();
      thisProduct.initAccordion();
      thisProduct.initOrderForm();
      thisProduct.processOrder();
      thisWidget.setValue(thisWidget.input.value);

      console.log('new Product:', thisProduct);

    }
    renderInMenu() {
      const thisProduct = this;

      /* generate  HTML based on template */
      const generatedHTML = templates.menuProduct(thisProduct.data);

      /* create element using utils.createElementFromHTM L*/
      thisProduct.element = utils.createDOMFromHTML(generatedHTML);

      /* find menu container */
      const menuContainer = document.querySelector(select.containerOf.menu);

      /* add element to menu */
      menuContainer.appendChild(thisProduct.element);

    }

    getElements() {
      const thisProduct = this;

      thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
      thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
      thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
      thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
      thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
      thisProduct.imageWrapper = thisProduct.element(select.menuProduct.imageWrapper);
      this.Product.amountWidgetElem = thisProduct.element(select.menuProduct.amountWidget);
    }

    initAccordion() {
      const thisProduct = this;
      /* find the clickable trigger (the element that should react to clicking) */
      const clickableTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);


      /* START: click event listener to trigger */
      clickableTrigger.addEventListener('click', function (event) {
        console.log('clicked');

        /* prevent default action for event */
        event.preventDefault();
        /* toggle active class on element of thisProduct */
        thisProduct.element.classList.toggle('active');

        /* find all active products */
        const activeProducts = document.querySelectorAll('.product.active');

        for (let product of activeProducts) {
          if (product != thisProduct.element) {
            product.classList.remove('active');
          }
        }

        /* START LOOP: for each active product */

        /* START: if the active product isn't the element of thisProduct */

        /* remove class active for the active product */

        /* END: if the active product isn't the element of thisProduct */

        /* END LOOP: for each active product */

        /* END: click event listener to trigger */
      });

    }

    initOrderForm() {
      const thisProduct = this;


      thisProduct.form.addEventListener('submit', function (event) {
        event.preventDefault();
        thisProduct.processOrder();
      });

      for (let input of thisProduct.formInputs) {
        input.addEventListener('change', function () {
          thisProduct.processOrder();
        });
      }

      thisProduct.cartButton.addEventListener('click', function (event) {
        event.preventDefault();
        thisProduct.processOrder();
      });
    }

    initAmountWidget() {
      const thisProduct = this;

      thisProduct.amountWidgetElem.addEventListener('updated', function (event) {
        event.preventDefault();
        thisProduct.processOrder();
      });

      thisProduct.amountWidget = new amountWidget(thisProduct.amountWidgetElem);
    }

    processOrder() {
      const thisProduct = this;

      /* read all data from the form (using utils.serializeFormToObject) and save it to const formData */

      const formData = utils.serializeFormToObjects(this.Product.form);
      console.log('formData', formData);

      /* set variable of the deafult price equal thisProduct.data.price */

      let price = thisProduct.data.price;


      /* start LOOP for  each optionId in param.options */
      /* save the element in thisProduct.data.params with key paramId as const param */
      for (optionId in thisProduct.data.params) {
        const param = thisProduct.data.params[paramId];

        /* START LOOP: for each optionId in param.options */
        for (let optionId in param.options) {

          /* save the element in param.options with key optionId as const option */
          const option = param.options[optionId];
          const optionSelected = formData.hasOwnProperty(paramId) && formData[paramId].indexOf(optionId) > -1;
          /* START IF: if option is selected and option is not default */
          if (optionSelected && !option.default) {

            /* add price of option to variable price */
            (price = price + option.price);
          }
          /* END IF: if option is selected and option is not default */
          /* START ELSE IF: if option is not selected and option is default */
          /* deduct price of option from price */

          else if (!optionSelected && option.default) {
            (price = price - option.price);
          }


          let className = '.' + paramId + '-' + optionId;
          let image = thisProduct.imageWrapper.querySelectorAll(className);

          if (optionSelected) {
            for (let image of images) {
              classNames.menuProduct.imageVisible.add('active');
            }
          } else {
            for (let image of images) {
              classNames.menuProduct.imageVisible.remove('active');
            }

          }
          /* END ELSE IF: if option is not selected and option is default */
        }
        /* END LOOP: for each optionId in param.options */
      }
      /* END LOOP: for each paramId in thisProduct.data.params */

      /* multiply price by amount */
      price *= thisProduct.amountWidget.value;

      /* set the contents of thisProduct.priceElem to be the value of variable price */
      let variablePrice = thisProduct.priceElem;
    }

  }

  class amountWidget {
    constructor(element) {
      const thisWidget = this;

      thisWidget.element = element;
      thisWidget.input = thisWidget.element.querySelector(select.widgets.amount.input);
      thisWidget.linkDecrease = thisWidget.element.querySelector(select.widgets.amount.linkDecrease);
      thisWidget.linkIncrease = thisWidget.element.querySelector(select.widgets.amount.linkIncrease);

      thisWidget.getElements(element);

      setValue(value) {
        const thisWidget = this;
    
        const newValue = parseInt(value);
        /*TO DO add validation */
    
        thisWidget.value = newValue;
        thisWidget.input.value = thisWidget.value;
      }
    
      announce() {
        const thisWidget = this;
        const event = new Event ('updated');
        thisWidget.element.dispatchEvent(event);
      }

      console.log('amountWidget:', thisWidget);
      console.log('constructor arguments:', element)
    }
  }

  const app = {
    initMenu: function () {
      const thisApp = this;
      console.log('thisApp.data:', thisApp.data);

      for (let productData in thisApp.data.products) {
        new Product(productData, thisApp.data.products[productData]);
      }
    },

    initData: function () {
      const thisApp = this;

      thisApp.data = dataSource;
    },

    initActions: function (){
      const thisApp = this;

      thisWidget.input.addEventListener('change', function(event){
        thisWidget.value = thisWidget.input.value;
      });
      thisWidget.linkDecrease.addEventListener('click', function(event){
        event.preventDefault(); 
        thisWidget.setValue(thisWidget.value -1);
      });
      thisWidget.linkIncrease.addEventListener('click', function(event){
        event.preventDefault();
        thisWidget.setValue(thisWidget.value +1);
      });
    }

    init:function() {
      const thisApp = this;

      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);
      console.log('thisApp.data:', thisApp.data);

      thisApp.initData();
      thisApp.initMenu();

    },

  };

  app.init();
}