import React from "react";
import {
  Switch,
  Redirect,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Contacts from "./components/Contacts";
import LoginPage from "./components/LoginPage";

function App() {
  const token = useSelector((state) => state.logging.token);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/contacts" component={Contacts} />
        <Redirect to="/contacts" />
      </Switch>
    );
  } else {
    routes = routes = (
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <Router>
      <div>{routes}</div>
    </Router>
  );
}

export default App;
