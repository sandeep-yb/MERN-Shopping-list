import React, { Component } from "react";
import { Container, Button, ListGroup, ListGroupItem } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuid } from "uuid";

class ShoppingList extends Component {
  state = {
    items: [
      { id: uuid(), name: "Eggs" },
      { id: uuid(), name: "bread" },
      { id: uuid(), name: "milk" },
      { id: uuid(), name: "carrot" },
    ],
  };

  addItem = () => {
    const name = prompt("Enter the item name");
    if (name) {
      const { items } = this.state;
      this.setState({
        items: [...items, { id: uuid(), name }],
      });
    }
  };

  deleteItem = (id) => {
    this.setState({
      items: this.state.items.filter((item) => item.id !== id),
    });
  };

  render() {
    const { items } = this.state;

    return (
      <div>
        <Container>
          <Button onClick={this.addItem}>Add Item</Button>
          <ListGroup>
            <TransitionGroup>
              {items.map((item) => (
                <CSSTransition key={item.id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => this.deleteItem(item.id)}
                      style={{ margin: "0.5rem" }}
                    >
                      &times;
                    </Button>
                    {item.name}
                  </ListGroupItem>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ListGroup>
        </Container>
      </div>
    );
  }
}

export default ShoppingList;
