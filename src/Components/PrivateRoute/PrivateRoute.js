import React from 'react';
import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { BooksContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedUser, setLoggedUser] = useContext(BooksContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedUser.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;