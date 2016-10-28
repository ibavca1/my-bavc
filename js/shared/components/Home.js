import React                  from 'react';
import FotView                from './FotView';
import FotForm                from './FotForm';
import FotMenu                from './FotMenu';
import { bindActionCreators } from 'redux';
import * as FotActions       from '../actions/FotActions';
import { connect }            from 'react-redux';
import {Grid, Row, Col, Clearfix} from 'react-bootstrap';

const divLeftStyle = {
    float: 'left',
    width: '250px'
};

const divRightStyle = {
    float: 'right',
    width: '100%'
};



@connect(state => ({ fot: state.fot, menu: state.menu }))

export default class Home extends React.Component {
  render() {
    //console.log(state.fot);
    //console.log(state);
    console.log(this.props);
    const { fot, menu, dispatch } = this.props;
    return (
      <div id="fot-list">
	<Grid fluid={true}>
	    <Row className="show-grid">
		<Col lg={4}>
		    <FotMenu menu = {menu}
			{...bindActionCreators(FotActions, dispatch)} />
		</Col>
		<Col lg={8}>
		    <FotView fot={fot} style = {divRightStyle}
			{...bindActionCreators(FotActions, dispatch)} />
		    <FotForm
			{...bindActionCreators(FotActions, dispatch)} />
		</Col>
	    </Row>
	</Grid>
      </div>
    );
  }
}