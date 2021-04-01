import './OrderedBooks.css'
import React from 'react';

const OrderedBooks = (props) => {
    const {email, title, author, price} = props.orderInfo;
    return (
        <div className="order-bg">
            <h5><i>Book title:</i> {title}</h5>
            <h5><i>Author:</i> {author}</h5>
            <h5><i>Price:</i> ${price}</h5>
            
        </div>
    );
};

export default OrderedBooks;