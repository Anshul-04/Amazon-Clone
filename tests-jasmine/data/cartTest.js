import { addToCart,cart, loadFromStorage} from '../../data/cart.js'

describe('test suite - addToCart',() => {

  it('add an existing product to the cart',() => {

    spyOn(localStorage,'setItem');

    spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity : 1 ,
        deliveryOptionId : '1'
      }]);
    });

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);

  });

  it('add a new product to the cart',() => {

    spyOn(localStorage,'setItem');

    // creating fake empty version of cart using Mock
    spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    // reloading the cart
    loadFromStorage();

    //Create a Mock  to create a fake version of a cart
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });

});

/*
Flakey test : test which sometime passes ,sometimes fails

to handle this we use Mocks
Mocks : let us replace a method with fake version of it

to create a Mocks use spyOn([1st parameter is the objetc we want to mock] , [2nd para is the method we want to mock])
*/