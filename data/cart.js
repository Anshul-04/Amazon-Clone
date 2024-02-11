export let cart = JSON.parse(localStorage.getItem('cart')); // getting the cart from local storage

// if the our cart is null then give it a default value
if(!cart){
  cart = [
    {
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 2 ,
    deliveryOptionId : '1'
    },
    {
      productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity : 1,
      deliveryOptionId : '2'

    }];
}



// adding local storage
function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}


export function addToCart(productId){
  //checking if product is already in the cart?
  let matchingItem;

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  // if we add same item/product again just increase its count
  if(matchingItem){
    matchingItem.quantity += 1;
  }else{
  // adding it to cart 
  cart.push({
      productId : productId,
      quantity : 1,
      deliveryOptionId : '1'
    });
  }
  //after updating the cart(adding product in cart)
  saveToStorage();
}

// removing item from cart when we click delete button
export function removeFromCart(productId){
  /*
  to delet the product from cart
  1.create a new array
  2.loop through the array and add each product from cart into array except 
    the product to be deleted

  */
  const newCart=[];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart; // updating the cart to new cart
  saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}