import "./AdminPage.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [toggle, setToggle] = useState(true);
  const [booksData, setBooksData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((res) => res.json())
      .then((data) => {
        setBooksData(data);
      });
  }, []);

  const handleManageBooks = () => {
    setToggle(!toggle);
  };
  const handleAddBook = () => {
    setToggle(!toggle);
  };

//   const {title, author, price} = booksData;
//   console.log(title, author, price);
  return (
    <div className="row mt-5 admin-bg">
      <div className="col-md-3 p-5 bg-primary bg-gradient">
        <Link onClick={handleManageBooks} className="text-white">
          Manage books
        </Link>
        <br />
        <Link onClick={handleAddBook} className="text-white">
          add Book
        </Link>
      </div>

      <div className="col-md-9 bg-success bg-gradient" style={{paddingLeft:'80px'}}>
        {
        toggle ?
           <><h2>Manage Books</h2>
             <table border="1" style={{width:'95%',margingLeft:'10px'}}>
                <tr style={{borderBottom: '1px solid black',padding:'10px'}}> <th> <h4>Book Name</h4> </th> <th><h4>Author Name</h4></th> <th><h4>Price</h4></th>  <th><h4>Action</h4></th></tr>
                {
                    booksData.map(book =>
                    <tr style={{borderBottom: '1px solid black',padding:'10px'}}> <th >{book.title}</th> <th >{book.author}</th> <th >${book.price.value}</th>  <th > <button className="btn btn-danger">delete</button> </th> </tr>)
                }

             </table>
           </> 
           : 
          <>
          </>
        }
      </div>
    </div>
  );
};

export default AdminPage;
