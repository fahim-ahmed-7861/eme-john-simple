import { prod } from 'mathjs';
import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);


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


    const handleAddProduct = (product) => {

        let count;

        const sameProduct = cart.find(pd => pd.key === product.key);

        let newCart = [];

        if (sameProduct) {

            console.log(1, " ", sameProduct);

            newCart = [...cart];
            for (var i = 0; i < newCart.length; i++) {
                if (newCart[i].key === product.key) {
                    newCart[i].quantity += 1;
                    count = newCart[i].quantity;
                    product.quantity = count;
                    break;
                }
            }
        }
        else {
            product.quantity = 1;

            count = 1;

            newCart = [...cart, product];
        }



        // const newCart=[...cart,product];

        console.log(newCart);

        setCart(newCart);

        //  const sameProduct=newCart.filter(pd=>pd.key===product.key);

        addToDatabaseCart(product.key, count);




    }
    return (
        <div className='twin-container'>
            <div className="product-container">
                {
                    products.map(product => <Product
                        handleAddProduct={handleAddProduct}
                        product={product} key={product.key} showAddToCart={true}></Product>)
                }
            </div>

            <div className="cart-container">
                <Cart cart={cart}>

                <Link to='/review'>
                        <button className='main-button'>Review Order</button>
                </Link>
                  
                </Cart>
               
            </div>


        </div>
    );
};

export default Shop;