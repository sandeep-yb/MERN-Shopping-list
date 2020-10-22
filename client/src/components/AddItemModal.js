import React, { Component } from 'react';
import {
 Button,
 Modal,
 ModalBody,
 ModalHeader,
 Form,
 FormGroup,
 Label,
 Input 
} from 'reactstrap';
import { v4 as uuid } from "uuid";
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';



class AddItemModal extends Component {
    state = {  
        modal: false,
        name: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({
            // name: e.target.value

            [e.target.name]: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            id: uuid(),
            name: this.state.name 
        };

        this.props.addItem(newItem);
        this.toggle();
    } 

    render() { 
        return (
          <div>
            <Button onClick={this.toggle}>Add Item</Button>

            <Modal isOpen={this.state.modal} toggle = {this.state.toggle}>
                <ModalHeader toggle={this.toggle}>
                    Add item to Shopping List
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input name="name" type="text" onChange={this.onChange}/>
                        </FormGroup>
                        <Button type="submit">Add item</Button>
                    </Form>
                </ModalBody>
            </Modal>
          </div>
        );
    }
}

const mapDispatchToProps = {
    addItem
}
 
export default connect(null, mapDispatchToProps)(AddItemModal);