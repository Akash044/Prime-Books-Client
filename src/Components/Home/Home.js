import "./Home.css";
import React, { useEffect, useState } from "react";
import Books from "../Books/Books";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  document.title = "Home";
  const [booksData, setBooksData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then((res) => res.json())
      .then((data) => {
        setBooksData(data);
      });
  }, []);

  let i = 1;
  return (
    <div className="container">
      <Navbar></Navbar>
      {!booksData.length ? (
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
        <div className="card-display mt-5 ms-4">
          {booksData.map((book) => (
            <Books key={i++} details={book}></Books>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
