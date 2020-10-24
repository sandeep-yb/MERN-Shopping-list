import React, { Component } from "react";
import "./App.css";
import { Container } from "reactstrap";
import { NavBar, ShoppingList, AddItemModal } from "./components";
import { loadUser } from "./actions/authActions";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    console.log("CDM", this.props.token);
    this.props.loadUser();
  }

  // componentDidUpdate() {
  //   // console.log('CDM',this.props.token);
  //   this.props.loadUser();
  // }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Container>
          <AddItemModal />
          <ShoppingList />
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = {
  loadUser,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
