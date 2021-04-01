import "./App.css";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createContext, useState } from "react";
import LoginPage from "./Components/LoginPage/LoginPage";
import Checkout from "./Components/Checkout/Checkout";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Orders from "./Components/Orders/Orders";
import AdminPage from "./Components/AdminPage/AdminPage";

export const BooksContext = createContext();

function App() {
  const [user, setUser] = useState({});
  return (
  <BooksContext.Provider value={[user, setUser]}>
    <Router>
          <Switch>
            <Route exact path="/">
             <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/login">
            <LoginPage></LoginPage>
            </Route>
            <PrivateRoute path="/checkout/:id">
              <Checkout></Checkout>
            </PrivateRoute>
            <PrivateRoute path="/orders">
              <Orders></Orders>
            </PrivateRoute>
            <PrivateRoute path="/admin">
              <AdminPage></AdminPage>
            </PrivateRoute>
          </Switch>
        </Router>
  </BooksContext.Provider>
  );
}
export default App;
