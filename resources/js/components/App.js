import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import Header from './Header';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Footer from './Footer';


const Protected = () => <h3>Protected</h3>;

const PrivateRoute = ({ component: Component, ...rest }) =>{
    console.log('Private Route');
    return(
        <Route {...rest} render={(props) => (
          true === true ? <Component {...props} /> : <Redirect to='/login' />
        )} />
    )
}

export default class App extends Component {
        
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Route exact path="/" component={Signup} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <PrivateRoute path='/protected' component={Protected} />
                </div>
            </Router>
        );
    }
}

//if (document.getElementById('app')) {
ReactDOM.render(<App />, document.getElementById('app'));
//}
