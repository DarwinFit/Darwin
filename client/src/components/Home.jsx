import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';

import NavHome from "./NavHome.jsx";

const Home = (props) => (
  <div>
    <NavHome uiConfig={props.uiConfig}/>
    <Switch>
    <Route exact path="/" render={() => (
      <div>
        <article className="home-text">
          <h1 className="home-title">Welcome to the HealthApp</h1>
          <div className="home-p">
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis eu est nec euismod. Integer sodales sapien sollicitudin tortor hendrerit imperdiet. Ut accumsan, nisl a viverra condimentum, orci arcu consectetur dui, quis condimentum dolor metus sit amet sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec aliquet tristique dictum. Sed pharetra maximus est at molestie. Phasellus maximus nulla eget orci euismod, vel suscipit tellus ultricies. In hac habitasse platea dictumst.            
            </p>
            <p>
            Quisque ultrices quis odio ut ullamcorper. Vestibulum lorem metus, viverra ut elit vel, blandit interdum sapien. Morbi sed quam sem. Suspendisse lobortis tristique justo, nec vulputate mauris congue elementum. Sed sodales imperdiet accumsan. Donec quam magna, placerat at porta scelerisque, ornare sit amet justo. Vestibulum suscipit diam velit, et fermentum lorem fermentum id. Ut dignissim purus id nisl convallis maximus.
            </p>
          </div>
        </article>
        
      </div>
    )}/>

			{/*Removed the Routes from here, since we are using the PopUp component in the navHome, so there is no Need for them*/}
		</Switch>
	</div>
);

export default Home;
