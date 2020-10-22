import React from "react";
import "./App.css";
import { Container } from "reactstrap";
import { NavBar, ShoppingList, AddItemModal } from "./components";

function App() {
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

export default App;
