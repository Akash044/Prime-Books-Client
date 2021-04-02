import React, { useContext, useEffect, useState } from "react";
import { BooksContext } from "../../App";
import Navbar from "../Navbar/Navbar";
import OrderedBooks from "../OrderedBooks/OrderedBooks";

const Orders = () => {
  document.title = "Orders";
  const [userAndBookInfo, setUserAndBookInfo] = useContext(BooksContext);
  const { userName, email } = userAndBookInfo;
  const [allOrders, setAllOrders] = useState([]);
  useEffect(() => {
    fetch(`https://apricot-pie-46014.herokuapp.com/allOrder/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setAllOrders(data);
      });
  }, [email]);
  console.log(allOrders);
  let i = 1;
  return (
    <>
      <Navbar></Navbar>
      <div className="container mt-4">
        <div className="rounded shadow p-3 bg-gradient text-white" style={{backgroundColor:"#6946F4"}}> 
        <h3>User Name: {userName}</h3>
        <h4>Email: {email}</h4>
        <h5>Ordered books list:</h5>
        </div>
        
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Book Name</th>
              <th>Author name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Order placed time</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <OrderedBooks key={i++} orderInfo={order}></OrderedBooks>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
