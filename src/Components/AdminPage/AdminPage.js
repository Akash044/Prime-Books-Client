import "./AdminPage.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTh, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const AdminPage = () => {
  document.title="Admin";
  const [toggle, setToggle] = useState(true);
  const [booksData, setBooksData] = useState([]);
  const [newBooksData, setNewBooksData] = useState({});
  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((res) => res.json())
      .then((data) => {
        setBooksData(data);
      });
  }, []);
  //  console.log(booksData);
  const handleManageBooks = () => {
    setToggle(!toggle);
  };
  const handleAddBook = () => {
    setToggle(!toggle);
  };
  const handleDeleteBook = (e, id) => {
    console.log(e.target.parentNode.parentNode,id);
    fetch(`http://localhost:8080/deleteBook/${id}`, {
      method: 'DELETE',
  })
  .then(res => res.json())
  .then(res => {
      e.target.parentNode.parentNode.style.display="none";
  })};
  const handleOnBlur = (e) => {
    console.log(e.target.name, e.target.value);
    if(e.target.name === 'price')
    {
      const newData = {...newBooksData, price:{value: e.target.value}}
      setNewBooksData(newData);
    }else{
      const newData = {...newBooksData,[e.target.name]:e.target.value}
      setNewBooksData(newData);
    }
    // const newData = {...newBooksData,}
    

  }
  const handleImageData = (e) =>{
    console.log(e.target.file);
    const imgData = new FormData();
    imgData.set("key", "95d6b9a2bf0db320d49744c0dda3c521");
    imgData.append("image",e.target.files[0]);
  
    axios.post('https://api.imgbb.com/1/upload', imgData)
    .then(res => {
      console.log(res);
      const newData = {...newBooksData,image:res.data.data.display_url}
      setNewBooksData(newData);

    })
    .catch(function (error) {
      console.log(error);
    });
  }
  console.log(newBooksData);
  const handleAddNewBook = () =>{
    axios.post('http://localhost:8080/addbook', newBooksData)
    .then(res => {
      console.log(res);
      setNewBooksData({});
    })
    .catch(function (error) {
      console.log(error);
    });
   

  }

  

//   const {title, author, price} = booksData;
//   console.log(title, author, price);
let i=1;
  return (
    <div className="row admin-bg">
      <div className="col-md-3 p-5 bg-color position">
      <Link to="/" className="text-white">
          <h5>PRIME BOOKS</h5>
        </Link>
        <br/>
        <Link onClick={handleManageBooks} className="text-white">
        <FontAwesomeIcon icon={faTh} /> Manage books
        </Link>
        <br />
        <Link onClick={handleAddBook} className="text-white">
        <FontAwesomeIcon icon={faPlus} /> Add Book
        </Link>
      </div>

      <div className="col-md-9 pt-5 " style={{paddingLeft:'60px'}}>
        {
        toggle ?
           <><h2>Manage Books</h2>
             <table border="1" style={{width:'95%',margingLeft:'10px',  textAlign:'center'}}>
             <tr style={{borderBottom: '1px solid black',padding:'10px'}}> <th scope="col"> <h4>SI</h4> </th> <th> <h4>Book Name</h4> </th> <th><h4>Author Name</h4></th> <th><h4>Price</h4></th>  <th><h4>Action</h4></th></tr>
             
                {
                    booksData.map(book =>
                    <tr style={{borderBottom: '1px solid black',padding:'10px'}}><th> {i++} </th> <th >{book.title}</th> <th >{book.author}</th> <th >${book.price.value}</th>  <th > <button className="btn btn-danger" onClick={(e) => handleDeleteBook(e, book._id)}><FontAwesomeIcon icon={faTrashAlt} /> Delete</button> </th> </tr>)
                }

             </table>
           </> 
           : 
           <> <h2>Add book</h2>
          <div className="input-group">
            <div className="m-3">
            <h4>Book Name</h4>
                <input type="text" name="title" className="mb-3" onBlur={handleOnBlur} placeholder="Enter Book Name"/> <br/>
                <h4>Book Price</h4>
                <input type="text" name="price" onBlur={handleOnBlur} placeholder="Enter price"/>
            </div>
            <div className="m-3">
            <h4>Author Name</h4>
                <input type="text" name="author" className="mb-3" onBlur={handleOnBlur} placeholder="Enter Author name"/> <br/>
                <h4>Upload an image</h4>
                <input type="file" onBlur={handleImageData}/>
            </div>
          </div>
          <button className="btn violet-color text-white ms-3" onClick={handleAddNewBook} disabled={!newBooksData.image && true}>Add Book</button>
          </>
        }
      </div>
    </div>
  );
};

export default AdminPage;
