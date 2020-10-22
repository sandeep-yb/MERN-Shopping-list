import React, { Component } from "react";
import { Container, Button, ListGroup, ListGroupItem } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { v4 as uuid } from "uuid";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getItems, deleteItem } from "../actions/itemActions";


class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

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
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;

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

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapDispatchToProps = {
  getItems,
  deleteItem
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
