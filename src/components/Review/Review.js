import { prod, prodDependencies } from 'mathjs';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';

const Review = () => {

    const [cart, setCart] = useState([])

    const [orderPlace,setOrderPlace] = useState(false);

    useEffect(() => {

    })

    const removeProduct=(productKey)=>{

       const newCart=cart.filter(pd=> pd.key!=productKey);

       setCart(newCart);

       removeFromDatabaseCart(productKey)

    }
    useEffect(() => {

        const saveCart = getDatabaseCart();

        const productKeys = Object.keys(saveCart);

        const cartProducts = productKeys.map(key => {

            const products = fakeData.find(pd => pd.key === key)

            products.quantity = saveCart[key];

            return products;

        });

        setCart(cartProducts);

    }, [])

    const placeOrder=()=> {

        
        setCart([]);

        processOrder();

        setOrderPlace(true)

    }

    let thankYou;

    if(orderPlace)
    thankYou=<img  src={happyImage}></img>

    return (
       
           

        <div className='twin-container'>
          
           <div className="product-container">
           {
                cart.map(product=><ReviewItem product={product} key={product.key}
                removeProduct={removeProduct}></ReviewItem>)
            }
           </div>
           {
               thankYou
           }

           <div className="cart-container">
               <Cart cart={cart}>
               <Link to='/review'>
                        <button onClick={placeOrder}className='main-button'>Place Your Order</button>
                </Link>
               </Cart>

           </div>
        </div>
    );
};

export default Review;