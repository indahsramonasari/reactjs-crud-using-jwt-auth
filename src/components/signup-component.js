import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import userService from "../services/user-service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const valEmail = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const valUsername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const valPassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSignUp= this.handleSignUp.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSignUp(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      userService.signup(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div class="mb-3 row">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleSignUp}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input type="text" className="form-control" name="username" value={this.state.username}onChange={this.onChangeUsername} validations={[required, valUsername]}/>
                </div>

                <div className="form-group"> 
                <label htmlFor="email">Email</label>
                  <Input type="text" className="form-control" name="email" value={this.state.email} onChange={this.onChangeEmail} validations={[required, valEmail]}/>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input type="password" className="form-control" name="password" value={this.state.password} onChange={this.onChangePassword} validations={[required, valPassword]}/>
                </div>

                <br></br>
                <div className="form-group">
                  <div class="d-flex justify-content-center">
                  <button className="btn btn-success">Sign Up</button>
                  </div>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert" > {this.state.message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={c => { this.checkBtn = c; }}/>
          </Form>
        </div>
      </div>
    );
  }
}
