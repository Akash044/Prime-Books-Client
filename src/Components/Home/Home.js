import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Books from "../Books/Books";
import fakedata from "../../Data/fakedata.json";

const Home = () => {
  const [booksData, setBooksData] = useState([]);
  // const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((res) => res.json())
      .then((data) => {
        setBooksData(data);
      });
  }, []);
  return (
    <div>
      {booksData.length < 23 ? (
        <div className="d-flex justify-content-center ">
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="justify-content-center container row m-5">
          {booksData.map((book) => (
            <Books key={book.ISBN} details={book}></Books>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
