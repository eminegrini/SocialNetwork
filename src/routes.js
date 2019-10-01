  
import React from "react";
import { Route, Redirect, Switch } from "react-router";
import Login from "./components/login";
import Register from './components/register'
import Home from './components/home'
import App from './App'


const Routes = () => (
  <App>
    <Switch>
      <Redirect exact from="/" to="/login" />
      <Route exact path="/home"  component={Home}/>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  </App>
);

export default Routes;