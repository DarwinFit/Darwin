import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';

import NavHome from "./NavHome.jsx";
import Background from '../img/appleHome.jpg';

const Home = (props) => (
  <div>
    <NavHome />
    <Switch>
    <Route exact path="/" render={() => (
      <div style={{width:'50%'}}>
        <h1 className="text-left">Welcome to the HealthApp</h1>
        <p className="text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis eu est nec euismod. Integer sodales sapien sollicitudin tortor hendrerit imperdiet. Ut accumsan, nisl a viverra condimentum, orci arcu consectetur dui, quis condimentum dolor metus sit amet sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec aliquet tristique dictum. Sed pharetra maximus est at molestie. Phasellus maximus nulla eget orci euismod, vel suscipit tellus ultricies. In hac habitasse platea dictumst.
        </p>
        <p className="text-left">
          Quisque ultrices quis odio ut ullamcorper. Vestibulum lorem metus, viverra ut elit vel, blandit interdum sapien. Morbi sed quam sem. Suspendisse lobortis tristique justo, nec vulputate mauris congue elementum. Sed sodales imperdiet accumsan. Donec quam magna, placerat at porta scelerisque, ornare sit amet justo. Vestibulum suscipit diam velit, et fermentum lorem fermentum id. Ut dignissim purus id nisl convallis maximus.
        </p>
      </div>
    )}/>

    <Route path="/login" render={() => (
      <p>LOGIN</p>
    )}/>

    <Route path="/signup" render={() => (
      <p>SIGNUP</p>
    )}/> 
    </Switch>
  </div>
);

export default Home;