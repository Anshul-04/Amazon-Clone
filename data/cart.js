export const cart = [];

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
      quantity : 1
    });
  }
}