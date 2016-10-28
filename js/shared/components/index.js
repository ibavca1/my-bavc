import React,{Component} from 'react';

class AppView extends Component{
	render(){
		return (
			<div id="app-view">
			<h1>Fot-online</h1>
			<hr />
			{this.props.children}
			</div>
		)
	}
}

export default AppView;
