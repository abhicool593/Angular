import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  //Subject is a subclass of Observable,We can use Subject to publish events in our code.
  //The event will be sent to all of the subscribers

  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {

      //check if we already have that item in our cart
       let alreadyExistsInCart: boolean = false;
       let existingCartItem: CartItem = undefined;


       if(this.cartItems.length > 0){
      //find the item in the cart based on item id

        // for(let tempCartItem of this.cartItems){
        //   if(tempCartItem.id === theCartItem.id){
        //     existingCartItem = tempCartItem;
        //     break;
        //   }
        // }
        //Refactored code
        existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id );
      //check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);

    }
    if(alreadyExistsInCart){
      //increament the quantity
      existingCartItem.quantity++;
    }
    else{
      //just add the item
      this.cartItems.push(theCartItem);
    }

    //compute cart total price and total quantity
    this.computeCartTotal();
  }
  computeCartTotal() {
      let totalPriceValue: number = 0;
      let totalQuantityValue: number = 0;

      for(let currentCartitem of this.cartItems){
        totalPriceValue+=currentCartitem.quantity*currentCartitem.unitPrice;
        totalQuantityValue+=currentCartitem.quantity;
      }

      //publish the new values ... all subscribers will receive the new data
      this.totalPrice.next(totalPriceValue);
      this.totalQuantity.next(totalQuantityValue);

      //log cart data just for debugging purposes
      this.logCartData(totalPriceValue, totalQuantityValue);

  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for(let tempCartItem of this.cartItems){
      const subTotalPrice= tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity: ${tempCartItem.quantity}, UnitPrice: ${tempCartItem.unitPrice}, subTotalPrice: ${subTotalPrice}`);
    }
    console.log(`total Quantity=${totalQuantityValue} and total Price=${totalPriceValue.toFixed(2)}`);
    console.log(`-------------`);
  }

  decrementQuantity(theCartItem: CartItem) {
     theCartItem.quantity--;
     if(theCartItem.quantity === 0){
          this.remove(theCartItem);
     }else{
         this.computeCartTotal();
     }
  }
  remove(theCartItem: CartItem) {
    //get index of item in the array
    const itemindex = this.cartItems.findIndex(tempCartItem => tempCartItem.id == theCartItem.id);

    //if found,remove the item from the array at the given index
    if(itemindex > -1){
      this.cartItems.splice(itemindex,1);
      this.computeCartTotal();
    }
  }

}
