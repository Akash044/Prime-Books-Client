import React from "react";
import { Link } from "react-router-dom";

const Books = (props) => {
    const {ISBN, title, author, summary, image, price} = props.details;
  return (
    <div className="card col-md-3 m-3" style={{width: "16rem"}}>
      <img src="" className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-title">{author}</h6>
        <p className="card-text mt-4">
            <h4>{price.value}</h4> 
        </p>
        <Link to={"/checkout"}><button className="btn btn-primary">
          BUY NOW
        </button></Link>
        
      </div>
    </div>
  );
};

export default Books;
