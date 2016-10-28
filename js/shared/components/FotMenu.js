import React, {Component} from 'react'
import {Link} from 'react-router'

export default class FotMenu extends Component {
    constructor(props){
	super(props);
	this.props.getMenu();
	this.props.menu.map((el)=>{console.log(el)});
    }
    render() {
	console.log('MainMenu');
	console.log(this.props.menu);
	return (
		<ul className='list-unstyled'>
			{
				this.props.menu.map((el)=>{
					<li>{el.title}</li>
				})
			}
		</ul>
	);
    }
}
