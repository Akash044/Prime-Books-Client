import './OrderedBooks.css'
import React from 'react';

const OrderedBooks = (props) => {
    const {title, author, price, time} = props.orderInfo;
    return (
        <tr className="order-bg">
            <td>{title}</td>
            <td>{author}</td>
            <td>1</td>
            <td>${price}</td>
            <td>{time}</td>
            
        </tr>
    );
};

export default OrderedBooks;