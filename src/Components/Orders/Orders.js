import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { BooksContext } from "../../App";
import OrderedBooks from "../OrderedBooks/OrderedBooks";

const Orders = () => {
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
  let i=1;
  return (
    <div className="container-fluid" style={{width:"30%"}} >
      <h3>User: {email}</h3>
      <h5>Ordered books list:</h5>
      {
        allOrders.map(order => <OrderedBooks key={i++} orderInfo={order}></OrderedBooks>)
      }
      
    </div>
  );
};

export default Orders;
