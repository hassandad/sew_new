import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";


class Signup extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          email: '',
          username: '',
          password: '',
          repeatPassword: '',
          userType: 'customer',
          acceptAggrement: '',
          formErrors:{},
          inSubmitState:false,
          shouldRedirect: false
      };

      this.handleEmail = this.handleEmail.bind(this);
      this.handleUsername = this.handleUsername.bind(this);
      this.handlePassword = this.handlePassword.bind(this);
      this.handleRepeatPassword = this.handleRepeatPassword.bind(this);
      this.handleUserType = this.handleUserType.bind(this);
      this.handleAcceptAggrement = this.handleAcceptAggrement.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.mounted = true;
  }

  handleEmail(event){
      this.setState({
          email: event.target.value
      });
  };

  handleUsername(event){
      this.setState({
          username: event.target.value
      });
  };

  handlePassword(event){
      this.setState({
          password: event.target.value
      });
  };

  handleRepeatPassword(event){
      this.setState({
          repeatPassword: event.target.value
      });
  };

  handleUserType(event){
      this.setState({
          userType: event.target.value
      });
  };

  handleAcceptAggrement(event){
      this.setState({
          acceptAggrement: event.target.value
      });
  };

  handleSubmit(event) {
      event.preventDefault();

      const formValues = {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          password_confirmation: this.state.repeatPassword,
          user_type: this.state.userType,
      };

      let self = this;
      // Submit form values to ajax api
      this.setState({
        inSubmitState:true
      });

      axios.post('/api/register', formValues)
      .then(function (response) {
//          self.setState({
//            shouldRedirect:true
//          });
        return self.props.history.push('/login');
      })
      .catch(function (error) {
        console.log(error);

        if(error.hasOwnProperty('response')){
          console.log(error.response.data.errors);
          self.setState({
            formErrors:error.response.data.errors
          });
        }
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
    
  render(){

      return(
          <main role="main" className="container main-body-container">
              <div className="row align-items-center signup-form">
                  <div className="col-md-6 ml-auto mr-auto">

                  <div className="card">
                      <div className="card-header">
                        Signup
                      </div>
                      <div className="card-body">
                        <form className="needs-validation" onSubmit={this.handleSubmit} noValidate>
                          <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input onChange={this.handleEmail} type="email" className={'form-control '+ (this.state.formErrors.hasOwnProperty('email') ? 'is-invalid':'') } id="email" aria-describedby="emailHelp" />
                            <div className="invalid-feedback">
                              {this.state.formErrors.hasOwnProperty('email') > 0 ? this.state.formErrors.email[0] : ''}
                            </div>
                          </div>

                          <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input onChange={this.handleUsername} type="username" className={'form-control '+ (this.state.formErrors.hasOwnProperty('username') ? 'is-invalid':'') } id="username" aria-describedby="usernameHelp" />
                            <div className="invalid-feedback">
                              {this.state.formErrors.hasOwnProperty('username') > 0 ? this.state.formErrors.username[0] : ''}
                            </div>

                          </div>
                          <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input onChange={this.handlePassword} type="password" className={'form-control '+ (this.state.formErrors.hasOwnProperty('password') ? 'is-invalid':'') } id="password" />
                            <div className="invalid-feedback">
                              {this.state.formErrors.hasOwnProperty('password') > 0 ? this.state.formErrors.password[0] : ''}
                            </div>

                          </div>
                          <div className="form-group">
                            <label htmlFor="repeat_password">Repeat Password</label>
                            <input onChange={this.handleRepeatPassword} type="password" className={'form-control '+ (this.state.formErrors.hasOwnProperty('confirm_password') ? 'is-invalid':'') } id="repeat_password" />
                            {this.state.formErrors.hasOwnProperty('confirm_password') > 0 ? this.state.formErrors['confirm_password'][0] : ''}
                          </div>

                          <div className="form-group">
                              <label htmlFor="user-type">Sign up as a</label>
                              <select onChange={this.handleUserType} id="user-type" className={'form-control '+ (this.state.formErrors.hasOwnProperty('user_type') ? 'is-invalid':'') }>
                                <option value="customer">Customer</option>
                                <option value="writer">Writer</option>
                              </select>
                              <div className="invalid-feedback">
                                {this.state.formErrors.hasOwnProperty('user_type') > 0 ? this.state.formErrors['user_type'][0] : ''}
                              </div>
                          </div>

                          <div className="form-group form-check">
                            <input onChange={this.handleAcceptAggrement} type="checkbox" name="accept_aggrement" className={'form-check-input '+ (this.state.formErrors.hasOwnProperty('accept_aggrement') ? 'is-invalid':'') } id="accept_aggrement" />
                            <label className="form-check-label" htmlFor="accept_aggrement">I accept User Agreement</label>
                            <div className="invalid-feedback">
                              {this.state.formErrors.hasOwnProperty('accept_aggrement') > 0 ? this.state.formErrors['accept_aggrement'][0] : ''}
                            </div>
                          </div>
                          <button type="submit" className="btn btn-primary" disabled={ this.state.inSubmitState }>
                            <span className={'spinner-grow spinner-grow-sm ' + (this.state.inSubmitState ? '':'d-none') } role="status" aria-hidden="true"></span>
                            { this.state.inSubmitState ? 'Loading...' : 'Sign up' }
                          </button>
                        </form>
                      </div>
                  </div>

                  </div>
              </div>
          </main>
      )
  }
}

export default Signup