import React from 'react';
import { withRouter } from 'react-router-dom';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInput(type) {
		return event => {
			this.setState({
				[type]: event.target.value
			});
		};
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.history.push(`/results?=${this.state.value}`);
	}

	render() {
		return (
			<React.Fragment>
				<form id="search-form" onSubmit={this.handleSubmit}>
					<input
						type="text"
						name="search"
						id="search-bar"
						value={this.state.value}
						onChange={this.handleInput('value')}
						placeholder="So what's on your mind?"
					/>
					<button id="search-button" onClick={this.handleSubmit} />
				</form>
			</React.Fragment>
		);
	}
}

export default withRouter(Search);
