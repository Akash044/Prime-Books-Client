import React, { useContext, useState } from 'react';
import { BooksContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/fontawesome-free-brands';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config"
import { useHistory, useLocation } from 'react-router';
if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }

const LoginPage = () => {
    document.title="Check Out";
    const provider = new firebase.auth.GoogleAuthProvider();
    const [loggedUser, setLoggedUser] = useContext(BooksContext);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                setLoggedUser({userName: user.displayName, email: user.email, photo: user.photoURL});
                history.replace(from);
            }).catch(() => { });
    }

    return (
        <div className="justify-content-center">
            <button className="btn btn-primary" onClick={handleGoogleSignIn}> <FontAwesomeIcon className='font-awesome me-2' icon={faGoogle} />Continue with Google</button>
        </div>
    );
};

export default LoginPage;