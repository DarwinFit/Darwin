import React from 'react';
import Popup from 'reactjs-popup';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import '../css/PopUpStyle.css';
// this component triggers a pop-up window which lets us use the authentification
//tried to import css and use it, doesn't work properly, once styles. is removed from classname, it will stop working!!
const PopUp = (props) => {
	return (
		<Popup trigger={<a className="NavBar">{props.page}</a>} on="click" modal>
			{(close) => (
				<div className="styles.modal">
					<div className="styles.content">
						<div>
							<StyledFirebaseAuth uiConfig={props.uiConfig} firebaseAuth={firebase.auth()} />
						</div>
					</div>
					<div className="styles.actions">
						<button
							className="styles.button"
							onClick={() => {
								console.log('modal closed ');
								close();
							}}
						>
							Close
						</button>
					</div>
				</div>
			)}
		</Popup>
	);
};

export default PopUp;
