import React from 'react';
import { create, all, number } from 'mathjs'


const Cart = (props) => {

    const cart = props.cart;
  //  var total = cart.reduce((total, prod) => total += prod.price*prod.quantity, 0);

    var total=0;

    for(var i=0; i<cart.length; i++) {

        total += cart[i].price*cart[i
        ].quantity;

      
    }

    let shippingCost = 12.99;

    if (35 < total)
        shippingCost = 0;

    else if (total > 15.99)
        shippingCost = 4.99;

    else if (props.cart.length == 0) {
        shippingCost = 0;

    }

    const formatNum = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    var tax = Math.round(total / 10).toFixed(2);

    const grandTotal = (total + shippingCost + Number(tax)).toFixed(2);

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Item Orders :{props.cart.length}</p>
            <p>Product Price : {formatNum(total)}</p>
            <p>Shipping Cost : {shippingCost}</p>
            <p><small>Tax+Vat : {tax}</small></p>
            <p>Total price : {grandTotal}</p>
            <br/>
            {props.children}
           
            

        </div>
    );
};

export default Cart;