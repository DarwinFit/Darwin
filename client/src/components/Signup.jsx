import React from 'react';
import { NavLink } from 'react-router-dom';

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
				<ul className="navhome">
					<li className="navhome-brand">
						<NavLink to="/">DarWin</NavLink>
					</li>
				</ul>
				<form className="signup-box" onSubmit={this.handleClick}>
					<table className="signup-form">
					<thead>
						<tr>
							<td className="signup-title" colSpan={3}>
								<b>Fitness Profile for {this.props.username}</b>
							</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="signup-form-left">Age</td> 
							<td className="signup-form-right" colSpan={2}>
								<input type="number" name="age" value={age} onChange={this.handleChange}/>
							</td>
						</tr>
						<tr>
							<td className="signup-form-left">Gender</td>
							<td className="signup-form-right">
								<label className="gender-radio">
									<input type="radio" name="gender" value={'male'} onChange={this.handleChange}/>
									Male
								</label>
								<label className="gender-radio">
									<input type="radio" name="gender" value={'female'} onChange={this.handleChange}/>
									Female
								</label>
							</td>
						</tr>
						<tr>
							<td className="signup-form-left">Height [cm]</td>
							<td className="signup-form-right" colSpan={2}>
								<input type="number" name="height" value={height} onChange={this.handleChange}/>			
							</td>
						</tr>
						<tr>
							<td className="signup-form-left">Weight [kg]</td>
							<td className="signup-form-right" colSpan={2}>
								<input type="number" name="weight" value={weight} onChange={this.handleChange}/>
							</td>
						</tr>
					</tbody></table>

					<button className="signup-signup" type="submit" onClick={this.handleClick}>
						<NavLink to="/" style={{ textDecoration: 'none', color:'white'}}>Sign Me Up!</NavLink>
					</button>
				</form>
			</div>
		);
	}
}

export default Signup;
