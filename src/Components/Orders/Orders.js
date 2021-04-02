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
    fetch(`http://localhost:8080/allOrder/${email}`)
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
        <h3>User Name: {userName}</h3>
        <h4>Email: {email}</h4>
        <h5>Ordered books list:</h5>
        <table
          border="1"
          style={{ width: "95%", textAlign: "center" }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid black", padding: "10px" }}>
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