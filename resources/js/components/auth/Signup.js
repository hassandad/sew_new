import React, { Component } from 'react';
import axios from 'axios';


class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            repeatPassword: '',
            userType: '',
            acceptAggrement: '',
        };
        
        this.handleEmail = this.handleEmail.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleRepeatPassword = this.handleRepeatPassword.bind(this);
        this.handleUserType = this.handleUserType.bind(this);
        this.handleAcceptAggrement = this.handleAcceptAggrement.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        
        // Submit form values to ajax api
        axios.post('/api/register', formValues)
        .then(function (response) {
            
        })
        .catch(function (error) {
          console.log(error);
        });
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
                          <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                              <label htmlFor="email">Email address</label>
                              <input onChange={this.handleEmail} type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                            </div>
                            <div className="form-group">
                              <label htmlFor="username">Username</label>
                              <input onChange={this.handleUsername} type="username" className="form-control" id="username" aria-describedby="usernameHelp" />
                            </div>
                            <div className="form-group">
                              <label htmlFor="password">Password</label>
                              <input onChange={this.handlePassword} type="password" className="form-control" id="password" />
                            </div>
                            <div className="form-group">
                              <label htmlFor="repeat_password">Repeat Password</label>
                              <input onChange={this.handleRepeatPassword} type="password" className="form-control" id="repeat_password" />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="user-type">Sign up as a</label>
                                <select onChange={this.handleUserType} id="user-type" className="form-control">
                                  <option value="customer">Customer</option>
                                  <option value="writer">Writer</option>
                                </select>
                            </div>
                            
                            <div className="form-group form-check">
                              <input onChange={this.handleAcceptAggrement} type="checkbox" name="accept_aggrement" className="form-check-input" id="accept_aggrement" />
                              <label className="form-check-label" htmlFor="accept_aggrement">I accept User Agreement</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Sign up</button>
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