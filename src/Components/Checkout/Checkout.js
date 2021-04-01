import React, { useContext, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { BooksContext } from "../../App";
import Navbar from "../Navbar/Navbar";

const Checkout = () => {
  document.title="Check Out";
  const { id } = useParams();
  const [userAndBookInfo, setUserAndBookInfo] = useContext(BooksContext);

  useEffect(() => {
    fetch(`http://localhost:8080/book/${id}`)
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
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleCheckOut = () => {
    fetch("http://localhost:8080/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userAndBookInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    history.replace(from);
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
