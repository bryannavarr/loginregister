import React, { Component } from 'react';
import './../css/videl.css';
import './../css/login.css';

import video from './files/beach.mp4';
import Login from './LoginForm';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<React.Fragment>
				<img
					src="http://n3n.io/wp-content/uploads/2018/05/N3N_White_Small.png"
					id="logo"
				/>
				<video autoPlay muted loop id="myVideo">
					<source src={video} type="video/mp4" />
				</video>
				<div className="container" id="panel">
					<div className="row justify-content-center">
						<Login />
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Home;
