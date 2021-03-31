import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BooksContext } from '../../App';

const Checkout = () => {
    const {id} = useParams();
    const [loggedUser, setLoggedUser] = useContext(BooksContext);
    useEffect(() => {
        fetch(`http://localhost:8080/book/${id}`)
        .then(res => res.json())
        .then(data =>{
            const newData = {...loggedUser, title: data.title, author: data.author, price: data.price.value};
            setLoggedUser(newData);

        });
    },[id])

    const {title ,author, price} = loggedUser;


    const handleCheckOut = () => {
        fetch(`http://localhost:8080/`)
    }

    return (
        <div>
            <h4>{title}</h4>
            <h4>{author}</h4>
            <h4>{price}</h4>
            <button onClick={handleCheckOut}></button>
            
        </div>
    );
};

export default Checkout;