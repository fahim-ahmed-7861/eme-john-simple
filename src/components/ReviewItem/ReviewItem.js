import React from 'react';

const ReviewItem = (props) => {
   
    const { name, quantity,key,price } = props.product;

    const reviewItemStyle = {
        borderBottom: '1px solid lightgrey',
        margin: '5px',
        padding: '5px',
        marginRight: '200px',
      
    }

    return (
        <div style={reviewItemStyle } className='review-item'>
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
    <p><small>price : {price}</small></p>
            <button onClick={()=>props.removeProduct(key)} className='main-button'>Remove</button>
        </div>
    );
};

export default ReviewItem;