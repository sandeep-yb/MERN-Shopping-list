import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  NavLink,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class RegisterModal extends Component {
  state = {
    isOpen: false,
    name: "",
    email: "",
    password: "",
    msg: null,
  };

  componentDidUpdate(prevprops) {
    if (prevprops.error !== this.props.error) {
      if (this.props.error.id == "REGISTER_FAILURE") {
        this.setState({
          msg: this.props.error.msg,
        });
      } else {
        this.setState({
          msg: null,
        });
      }
    }

    if (this.state.isOpen) {
      if (this.props.isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    this.props.clearErrors();

    this.setState({
      isOpen: !this.state.isOpen,
      name: "",
      email: "",
      password: "",
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    this.props.register(user);
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <>
        <NavLink onClick={this.toggle} href="#"> Register</NavLink>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  onChange={this.onChange}
                  value={this.state.name}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  onChange={this.onChange}
                  value={this.state.email}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  onChange={this.onChange}
                  value={this.state.password}
                />
              </FormGroup>

              <Button type="submit">Register</Button>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const maoDispatchToProps = {
  register,
  clearErrors,
};

const mapStateToProps = (state) => ({
  error: state.error,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, maoDispatchToProps)(RegisterModal);
