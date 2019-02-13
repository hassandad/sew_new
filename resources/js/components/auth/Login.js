import React, { Component } from 'react';
import axios from 'axios';
import { auth } from '../helpers/auth';
import { Redirect } from "react-router-dom";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      redirectToReferrer: false,
      inSubmitState:false
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  
  componentDidMount(){
    this.mounted = true;
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  };
  
  handlePassword(event) {
    this.setState({
      password: event.target.value
    });
  };
  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      errorMessage: ''
    });

    const formValues = {
      email: this.state.email,
      password: this.state.password
    };


    this.setState({
      inSubmitState:true
    });
    
    var self = this;
    auth.authenticate(formValues).then(function () {
      console.log('submit resolve');
      self.setState({
        redirectToReferrer: true
      });
    }).catch(function (errors) {
      console.log('submit catch');
      self.setState({
        errorMessage: errors.email[0]
      });
    }).then(function(){
      if(self.mounted){
        self.setState({
          inSubmitState:false
        });
      }
    });
  }
  
  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    const isInvalid = this.state.errorMessage ? 'is-invalid' : '';
    const {redirectToReferrer} = this.state

    if (redirectToReferrer === true) {
      return <Redirect to='/home' />
    }

    return(
      <main role="main" className="container main-body-container">

        <form onSubmit={this.handleSubmit} className="form-signin text-center" noValidate>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input onChange={this.handleEmail} type="email" id="inputEmail" className={`form-control ${isInvalid}`} placeholder="Email address" required="" autoFocus="" />
          <label htmlFor="inputPassword" className="sr-only invalid">Password</label>
          <input onChange={this.handlePassword} type="password" id="inputPassword" className={`form-control ${isInvalid}`} placeholder="Password" required="" />
          <div className="error-message invalid-tooltip">
            {this.state.errorMessage}
          </div>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>


          <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={ this.state.inSubmitState } >
            <span className={'spinner-grow spinner-grow-sm ' + (this.state.inSubmitState ? '':'d-none') } role="status" aria-hidden="true"></span>
            { this.state.inSubmitState ? 'Submitting...' : 'Sign in' }
          </button>
          <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
        </form>
      </main>
  )
  }
}

export default Login;