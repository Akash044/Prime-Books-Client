import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { BooksContext } from '../../App';

const Checkout = () => {
    const {id} = useParams();
    const [userAndBookInfo, setUserAndBookInfo] = useContext(BooksContext);

    useEffect(() => {
        fetch(`http://localhost:8080/book/${id}`)
        .then(res => res.json())
        .then(data =>{
            const newData = {...userAndBookInfo, title: data.title, author: data.author, price: data.price.value};
            setUserAndBookInfo(newData);

        });
    },[id])

    const {title ,author, price} = userAndBookInfo;
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleCheckOut = () => {
        
        fetch("http://localhost:8080/addOrder",{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userAndBookInfo)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);

        });
        history.replace(from);
    }

    return (
        <div className="d-flex justify-content-center">
            <div>
            <h4>{title}</h4>
            <h4>{author}</h4>
            <h4>{price}</h4>
            <button className="btn btn-primary"onClick={handleCheckOut}>Checkout</button>

            </div>
            
            
        </div>
    );
};

export default Checkout;