import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import userService from "./services/user-service";
import Home from "./components/homepage-component";
import Signup from "./components/signup-component";
import Signin from "./components/signin-component";
import Product from "./components/product-component";
import eventListener from "./common/listener";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined
    };
  }

  logOut() {
    userService.logout();
  }

  componentDidMount() {
    const user = userService.getCurrentUser();
    if (user != null) {
      this.setState({
        currentUser: user
      });
    }
    eventListener.on("signout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    eventListener.remove("signout");
    this.setState({
      currentUser: undefined
    });
  }

  render() {

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-primary">
          <Link to={"/"} className="navbar-brand">
            <b>Products Management</b>
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/signup"} className="nav-link">
              <b>Sign Up</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/signin"} className="nav-link">
              <b>Sign In</b>
              </Link>
            </li>
          
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/product" component={Product} />
          </Switch>
        </div>

      </div>
    );
  }
}

export default App;
