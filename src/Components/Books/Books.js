import './Books.css'
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Books = (props) => {
    const {ISBN, title, author, summary, image, price, _id} = props.details;
  return (
    <div className="card col-md-3 m-3" style={{width: "16rem"}}>
      <img src={image} className="card-img-top" style={{height: "15rem"}} alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-title">{author}</h6>
        <div className="card-text mt-4">
            <h4 > <span className="text-color">${price.value}</span> </h4> 
        </div>
        <Link to={`/checkout/${_id}`}><button className="btn violet-color text-white">
        <FontAwesomeIcon icon={faShoppingCart} /> BUY NOW
        </button></Link>
        
      </div>
    </div>
  );
};

export default Books;
