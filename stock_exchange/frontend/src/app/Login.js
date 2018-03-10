import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import services from './Services';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      isValid: true
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    
    event.preventDefault();

    services.isValidUser(this.state.email, this.state.password)
    .then((response) => {
      if (response) {
        this.props.history.push({
          pathname: '/stocklist',
          state: { email: this.state.email }
        }); 
      } else {
        this.setState({
          isValid: false
        });
      }
    });

  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
          <FormGroup controlId="error" bsSize="large">
            <ControlLabel hidden={this.state.isValid}>Invalid email/password</ControlLabel>
          </FormGroup>
        </form>
      </div>
    );
  }
}