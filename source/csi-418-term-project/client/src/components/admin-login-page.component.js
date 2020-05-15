import React, { Component } from 'react';
import axios from 'axios';
import AdminPage from './admin-page.component'


class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: '',
      loginSuccess: false
    };


    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }



  handleSubmit(evt) {
    console.log("Submit attempt...");
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

    const login_request = {
      username: this.state.username,
      password: this.state.password
    }

    axios.post("http://184.72.171.109:5000/login/", login_request)
      .then(res => {
        console.log(res.data);
        if (res.data === true) {
          this.setState({ loginSuccess: true });
        }
        else {
          alert("The username or password was incorrect");
        }
      })

    document.getElementById("login-form").reset();
    return this.setState({ admin: '', password: '', error: '' });
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  render() {
    // NOTE: I use data-attributes for easier E2E testing
    // but you don't need to target those (any css-selector will work)
    if (this.state.loginSuccess === true) {
      return (<AdminPage />);
    }
    return (
      <div className="Login">
        <div class="row d-flex justify-content-center">
          <div class="col-md-6">
            <div class="card" style={{ width: "20rem" }} >
              <div class="card-body">
                <form id="login-form" class="needs-validation" novalidate onSubmit={this.handleSubmit}>
                  <div class="form-group">
                    <label for="inputAdminUserName">Username</label>
                    <input type="string" class="form-control" id="inputAdminUserName" placeholder="Enter admin username" onChange={this.handleUserChange} required />
                    <div class="invalid-feedback">
                      Please enter a username.
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="inputAdminPassword">Password</label>
                    <input type="password" class="form-control" id="inputAdminPassword" placeholder="Enter admin password" onChange={this.handlePassChange} required />
                    <div class="invalid-feedback">
                      Please enter a password.
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
