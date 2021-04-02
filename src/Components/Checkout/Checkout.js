import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { BooksContext } from "../../App";
import Navbar from "../Navbar/Navbar";

const Checkout = () => {
  document.title="Check Out";
  const { id } = useParams();
  const [userAndBookInfo, setUserAndBookInfo] = useContext(BooksContext);

  useEffect(() => {
    fetch(`https://apricot-pie-46014.herokuapp.com/book/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const newData = {
          ...userAndBookInfo,
          title: data.title,
          author: data.author,
          price: data.price.value,
          time: new Date().toDateString(),
        };
        setUserAndBookInfo(newData);
      });
  }, [id]);

  const { title, author, price, time } = userAndBookInfo;
  const history = useHistory();
  const handleCheckOut = () => {
    fetch("https://apricot-pie-46014.herokuapp.com//addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userAndBookInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        history.push("/orders");
      });
    
  };

  return (<><Navbar></Navbar>
    <div className="container-fluid m-5">
      
      <div >
      <h3>Checkout:</h3>
        <table border='1' style={{width:'80%',marging:'10px', textAlign:'center'}}>
            <tr style={{borderBottom: '1px solid black',padding:'10px'}}>
                <th>Book Name</th>
                <th>Author name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Checkout time</th>
            </tr>
          <tr >
            <th>{title}</th>
            <th>{author}</th>
            <th>1</th>
            <th>${price}</th>
            <th>{time}</th>
          </tr>
        </table>
        <button className="btn violet-color text-white mt-3" onClick={handleCheckOut}>
          Checkout
        </button>
      </div>
    </div></>
  );
};

export default Checkout;
