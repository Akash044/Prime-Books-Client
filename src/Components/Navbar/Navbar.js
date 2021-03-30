import './Navbar.css'
import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light nv">
      <div className="container-fluid">
        <a className="navbar-brand ms-5" href="#">
          <h3>PRIME BOOKS</h3>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end me-5 "
          id="navbarNav"
        >
          <ul className="navbar-nav text-dark ">
            <li className="nav-item ">
              <a
                className="nav-link active"
                aria-current="page"
                href="#"
              >
                <h5>Home</h5>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
               <h5>Orders</h5>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
               <h5>Admin</h5>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                href="#"
              >
                <h5>Checkout</h5>
              </a>
            </li>
            <li className="nav-item">
              <button className="btn btn-info"><h6>SIGN IN</h6></button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
