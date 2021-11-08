import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
        <div className="d-flex justify-content-center">
          <h3>Welcome to this simple react projects!</h3>
        </div>
        <br></br>
        <div className="d-flex justify-content-center">
          <img src="https://1.bp.blogspot.com/--l9ayjnxZ2Y/YYT9HxvseTI/AAAAAAAAOK0/07XMFa_VyVAQ9w0_h_zDAE5fpBUbb-dtACLcBGAsYHQ/w400-h266/hello.jpeg" class="img-fluid" alt="imageX"></img>
        </div>
        </header>
      </div>
    );
  }
}
