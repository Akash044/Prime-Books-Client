import "./AdminPage.css";
import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTh, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const AdminPage = () => {
  document.title = "Admin";
  const [toggle, setToggle] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [booksData, setBooksData] = useState([]);
  const [newBooksData, setNewBooksData] = useState({});
  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((res) => res.json())
      .then((data) => {
        setBooksData(data);
      });
  }, []);

  const handleDeleteBook = (e, id) => {
    console.log(e.target.parentNode.parentNode, id);
    fetch(`http://localhost:8080/deleteBook/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        e.target.parentNode.parentNode.style.display = "none";
      });
  };

  const handleOnBlur = (e) => {
    if (e.target.name === "price") {
      const newData = { ...newBooksData, price: { value: e.target.value } };
      setNewBooksData(newData);
    } else {
      const newData = { ...newBooksData, [e.target.name]: e.target.value };
      setNewBooksData(newData);
    }
  };

  const handleImageData = (e) => {
    setSpinner(!spinner);
    const imgData = new FormData();
    imgData.set("key", "95d6b9a2bf0db320d49744c0dda3c521");
    imgData.append("image", e.target.files[0]);

    axios.post("https://api.imgbb.com/1/upload", imgData)
      .then((res) => {
        const newData = { ...newBooksData, image: res.data.data.display_url };
        setNewBooksData(newData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleAddNewBook = () => {
    fetch("http://localhost:8080/addBook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooksData),
    })
      .then((res) => res.json())
      .then((data) => {
        setNewBooksData({});
        setSpinner(!spinner);
        alert("Successfully added");
      });
  };

  const { title, author, price, image } = newBooksData;
  let i = 1;
  return (
    <div className="row admin-bg">
      <div className="col-md-3 p-5 bg-color position">
        <Link to="/" className="text-white">
          <h3>PRIME BOOKS</h3>
        </Link>
        <br />
        <h5 onClick={() => setToggle(!toggle)} className="text-white pointer">
          <FontAwesomeIcon icon={faTh} /> Manage books
        </h5>
        <br />
        <h5 onClick={ () => setToggle(!toggle)} className="text-white pointer">
          <FontAwesomeIcon icon={faPlus} /> Add Book
        </h5>
      </div>

      <div className="col-md-9 pt-5" style={{ paddingLeft: "35px" }}>
        {toggle ? (
          <>
            <h2>Manage Books</h2>
            <table className=""
              border="1"
              style={{ width: "95%", textAlign: "center" }}
            >
              <thead>
                <tr
                  style={{ borderBottom: "1px solid black", padding: "10px" }}
                >
                  <th>
                    <h4>SI</h4>
                  </th>
                  <th>
                    <h4>Book Name</h4>
                  </th>
                  <th>
                    <h4>Author Name</h4>
                  </th>
                  <th>
                    <h4>Price</h4>
                  </th>
                  <th>
                    <h4>Action</h4>
                  </th>
                </tr>
              </thead>
              <tbody>
              {booksData.map((book) => (
                <tr
                  key={i++}
                  style={{ borderBottom: "1px solid black", padding: "10px" }}
                >
                  <th> {i} </th>
                  <th>{book.title}</th> <th>{book.author}</th>
                  <th>${book.price.value}</th>
                  <th>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDeleteBook(e, book._id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} /> Delete
                    </button>
                  </th>
                </tr>
              ))}
              </tbody>
            </table>
          </>
        ) : (
          <>
            <h2>Add book</h2>
            <div className="input-group">
              <div className="m-3">
                <h4>Book Name</h4>
                <input
                  type="text"
                  name="title"
                  className="mb-3"
                  onBlur={handleOnBlur}
                  placeholder="Enter Book Name"
                  defaultValue={title}
                />
                <br />
                <h4>Book Price</h4>
                <input
                  type="text"
                  name="price"
                  onBlur={handleOnBlur}
                  placeholder="Enter price"
                  defaultValue={price}
                />
              </div>
              <div className="m-3">
                <h4>Author Name</h4>
                <input
                  type="text"
                  name="author"
                  className="mb-3"
                  onBlur={handleOnBlur}
                  placeholder="Enter Author name"
                  defaultValue={author}
                />
                <br />
                <h4>Upload an image</h4>
                <input
                  type="file"
                  onChange={handleImageData}
                  defaultValue={image}
                />{!newBooksData.image && spinner && (<>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <strong> Uploading...</strong></>
                )}
              </div>
            </div>
            <button
              className="btn violet-color text-white ms-3"
              onClick={handleAddNewBook}
              disabled={!newBooksData.image && true}
            >
              Add Book
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default AdminPage;