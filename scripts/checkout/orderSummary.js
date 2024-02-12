import { cart ,removeFromCart,updateDeliveryOption} from "../../data/cart.js";// this syntax of exporting is called Named export

import { products ,getProduct} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'; // Using ESM version of external library using js modules method
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';  // this syntax of exporting is called default export
import { deliveryOptions,getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

/*
hello();
getting current date using external library Dayjs
const today = dayjs();

adding 7 days in current date
const deliveryDate = today.add(7,'days');
console.log(deliveryDate.format('dddd, MMMM D')); //format to display date
*/


export function renderOrderSummary(){


  let cartSummaryHTML ='';
  // looping through our cart items to get product ID and generate the html
  cart.forEach((cartItem)=>{

    const productId = cartItem.productId  // this will give us product id

    const matchingProduct = getProduct(productId); // from this we can get the product all information(other properties)
   
    // console.log(matchingProduct);

    //getting deliveryOptionId out of the cart
    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId) ;
   

    const today = dayjs() ;
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    ) ; 
    const dateString = deliveryDate.format(
      'dddd , MMMM D'
    );  

    cartSummaryHTML += `
      <div class="cart-item-container
        js-cart-item-container-${matchingProduct.id}
        ">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
            ${matchingProduct.name}
            </div>
            <div class="product-price"> 
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary
              js-delete-link" data-product-id = '${matchingProduct.id}'>
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionHTML(matchingProduct,cartItem)}     
          </div>
        </div>
      </div>
      `;
  });

  // generate deliveryOption HTML
  function deliveryOptionHTML(matchingProduct,cartItem){
    /*
    1.loop through deliveryOptions
    2. for each Option,generate some HTML
    3.Combine the HTML toogether  
    */

    let html = '' ;

    deliveryOptions.forEach((deliveryOption)=>{

      const today = dayjs() ;// getting today date
      const deliveryDate = today.add(deliveryOption.deliveryDays,'days') ; // adding deliveydays to current date
      const dateString = deliveryDate.format('dddd , MMMM D');  // this is for formatting to read easily
      const priceString = deliveryOption.priceCents 
          === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`

      const isChecked = deliveryOption.id === 
      cartItem.deliveryOptionId ;            

      html += `
            <div class="delivery-option js-delivery-option"
              data-product-id = "${matchingProduct.id}"
              data-delivery-option-id = "${deliveryOption.id}"
            >
              <input type="radio" 
              ${ isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">

              <div>
                <div class="delivery-option-date">
                  ${dateString}
                </div>
                <div class="delivery-option-price">
                  ${priceString} Shipping
                </div>
              </div>
            </div>
          `
    });

    return html;
  }


  //puttng the html generated for cartSummary into webpage using DOM
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


  //select all delet links
  document.querySelectorAll('.js-delete-link').forEach((link) => {

    link.addEventListener('click',() => {
      const productId = link.dataset.productId;
      removeFromCart(productId);    

      // removing deleted product from page (update the HTML after deleting the product from cart)
      const container = document.querySelector(`
        .js-cart-item-container-${productId}`
      );

      container.remove(); // using DOM remove() method to romve the html element from page

      renderPaymentSummary(); //regenerate the payment summary html when we delete any product from cart
    });
  });


  // adding event listener to delivery option radio button
  document.querySelectorAll('.js-delivery-option')
    .forEach((element)=>{
      element.addEventListener('click',()=>{
        // const productId = element.dataset.productId ;
        // const deliveryOptionId = element.dataset.deliveryOptionId;

        const {productId,deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId,deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary(); // when we change delivery option so it update(regenrate html of) the payment summary
      });
    });
}
