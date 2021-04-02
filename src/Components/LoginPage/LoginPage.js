import "./LoginPage.css";
import React, { useContext } from "react";
import { BooksContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/fontawesome-free-brands";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../Config/firebase.config";
import { useHistory, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const LoginPage = () => {
  document.title = "Login";
  const provider = new firebase.auth.GoogleAuthProvider();
  const [loggedUser, setLoggedUser] = useContext(BooksContext);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        setLoggedUser({
          userName: user.displayName,
          email: user.email,
          photo: user.photoURL,
        });
        history.replace(from);
      })
      .catch(() => {});
  };

  return (
    <>
      <Navbar></Navbar>
      <div className=" display-position">
        <div>
          <button
            className="btn violet-color text-white"
            onClick={handleGoogleSignIn}
          >
            <FontAwesomeIcon className="font-awesome me-2" icon={faGoogle} />
            Continue with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
