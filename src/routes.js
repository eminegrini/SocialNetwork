  
import React from "react";
import { Route, Redirect, Switch } from "react-router";
import Login from "./components/login";
import Register from './components/register'
import Home from './components/home'
import App from './App'
import profile from './components/profile'


const Routes = () => (
  <App>
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Redirect exact from="/home"  to="/profile/home"/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact from="/profile/home" component={Home} />
      <Route exact path='/profile/:profile_id' component={profile} />

    </Switch>
  </App>
);

export default Routes;