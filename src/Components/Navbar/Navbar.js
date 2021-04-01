import './Navbar.css'
import React, { useContext } from "react";
import { BooksContext } from '../../App';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [loggedUser, setLoggedUser] = useContext(BooksContext);
  const {email} = loggedUser;
  return (
    <nav className="navbar navbar-expand-lg navbar-light nv">
      <div className="container-fluid">
        <Link className="navbar-brand ms-5" to="/">
          <h3>PRIME BOOKS</h3>
        </Link>
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
              <Link
                className="nav-link active"
                aria-current="page"
                to='/'
              >
                <h5>Home</h5>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to='/orders'>
               <h5>Orders</h5>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to='/admin'>
               <h5>Admin</h5>
              </Link>
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
              <a className="nav-link active" href="#">
               <h5>{loggedUser.userName}</h5>
              </a>
            </li>
            <li className="nav-item">
              <button className="btn btn-info"><h6>{email ? 'Log out' : 'Login'}</h6></button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
