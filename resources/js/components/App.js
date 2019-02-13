import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import Header from './Header';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Footer from './Footer';
import Home from './Home';
import PostJob from './PostJob';
import { auth } from './helpers/auth';


const Protected = () => <h3>Protected</h3>;


const PrivateRoute = ({ component: Component, ...rest }) =>{
    let token = localStorage.getItem('token');
    return(
        <Route {...rest} render={(props) => (
          token ? <Component {...props} /> : 
          <Redirect to={{ pathname: "/login",state: { from: props.location }}} />
        )} />
    )
}

export default class App extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        const location = window.location.pathname;
        const nonHeaderPages = ['/login','/signup'];
        return (
            <Router>
                <div>
                    {!nonHeaderPages.includes(location) && <Header />}
                    <Route exact path="/" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <PrivateRoute path='/home' component={Home} />
                    <PrivateRoute path='/post-job' component={PostJob} />
                </div>
            </Router>
        );
    }
}

//if (document.getElementById('app')) {
ReactDOM.render(<App />, document.getElementById('app'));
//}
