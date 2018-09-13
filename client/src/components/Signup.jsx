import React from 'react';
import { FormGroup, Button, Radio, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const FieldGroup = ({ id, label, help, ...props }) => (
	<FormGroup controlId={id}>
		<ControlLabel>{label}</ControlLabel>
		<FormControl {...props} />
		{help && <HelpBlock>{help}</HelpBlock>}
	</FormGroup>
);

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			age: '',
			gender: '',
			height: '',
			weight: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChange(event) {
		event.preventDefault();
		this.setState({ [event.target.name]: event.target.value });
	}

	handleClick(event) {
		event.preventDefault();
		this.props.handleAddInfo(this.state.age, this.state.gender, this.state.height, this.state.weight);
	}

	render() {
		const { age, gender, height, weight } = this.state;
		return (
			<div>
				<header>
					<h2>Type in your data: </h2>
				</header>
				<form onSubmit={this.handleClick}>
					<h3>{this.props.username}</h3>

					<FieldGroup
						id="formControlsAge"
						type="age"
						label="Age"
						name="age"
						value={age}
						onChange={this.handleChange}
						placeholder="Enter Age"
					/>

					<FormGroup>
						<ControlLabel>Gender</ControlLabel>
						<Radio name="gender" value={'male'} onChange={this.handleChange} inline>
							Male
						</Radio>{' '}
						<Radio name="gender" value={'female'} onChange={this.handleChange} inline>
							Female
						</Radio>{' '}
					</FormGroup>

					<FieldGroup
						id="formControlsHeight"
						name="height"
						type="height"
						label="Height"
						value={height}
						onChange={this.handleChange}
						placeholder="Enter height"
					/>

					<FieldGroup
						id="formControlsWeight"
						name="weight"
						type="weight"
						label="Weight"
						value={weight}
						onChange={this.handleChange}
						placeholder="Enter weight"
					/>

					<Button type="submit" onClick={this.handleClick}>
						Submit
					</Button>
				</form>
			</div>
		);
	}
}

export default Signup;
