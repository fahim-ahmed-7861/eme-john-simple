import { prod, prodDependencies } from 'mathjs';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
    useParams
} from "react-router-dom";
import OrderDone from '../OrderDone/OrderDone';
const Review = () => {

    let match = useRouteMatch();

    const history = useHistory();

    const [cart, setCart] = useState([])

    const [orderPlace, setOrderPlace] = useState(false);

    useEffect(() => {

    })

    const removeProduct = (productKey) => {

        const newCart = cart.filter(pd => pd.key != productKey);

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

    const handleProceedCheckout = () => {


        history.push('/shipment')

    }

    let thankYou;

    if (orderPlace) {
        //thankYou=<img  src={happyImage}></img>

        return <Switch>
            <Route path={`${match.path}/orderDone`}>

                <OrderDone></OrderDone>

            </Route>

        </Switch>
    }

    return (



        <div className='twin-container'>

            <div className="product-container">
                {
                    cart.map(product => <ReviewItem product={product} key={product.key}
                        removeProduct={removeProduct}></ReviewItem>)
                }
            </div>

            <div className="cart-container">
                <Cart cart={cart}>
                   
                        <button onClick={handleProceedCheckout} className='main-button'>Proceed Checkout</button>
                  
                </Cart>

            </div>





        </div>
    );
};

export default Review;