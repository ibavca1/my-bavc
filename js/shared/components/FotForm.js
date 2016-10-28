import React from 'react';
import {
	Button, 
	FormControl, 
	Modal, 
	Form,
	Col,
	FormGroup,
	ControlLabel
    } from 'react-bootstrap';



export default class FotForm extends React.Component {
    constructor(props){
	super(props);
	this.state = {isOpen:false}
    }
    handleSubmit() {
    this.setState({isOpen:true});
    }
    handleClose(){
	this.setState({isOpen:false});
    }
    handleSave(){
	let node = this.refs['fot-input'];
	this.props.createFot(node.value);
	node.value = '';
	this.setState({isOpen:false});
    }
  render() {
    var self = this;
    return (
      <div id="fot-form">
        <Button type="submit" onClick={this.handleSubmit.bind(self)} >Добавить</Button>
    <div>
    <Modal show={this.state.isOpen} onHide={this.handleClose.bind(this)}>
      <Modal.Header>
        <Modal.Title>Modal title Fot</Modal.Title>
      </Modal.Header>

      <Modal.Body>
	<Form horizontal>
	    <FormGroup controlId="formFot">
		<Col componentClass={ControlLabel} sm={2}>
		    Email
		</Col>
		<Col sm={10}>
		    <input id='todo'  className='form-control'  type="text" placeholder="Fot todos" ref={'fot-input'}/>
		</Col>
	    </FormGroup>
	</Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={this.handleClose.bind(this)}>Закрыть</Button>
        <Button bsStyle="primary" onClick={this.handleSave.bind(this)}>Сохранить и закрыть</Button>
      </Modal.Footer>

    </Modal>
  </div>

      </div>
    );
  }
}