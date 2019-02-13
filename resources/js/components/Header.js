import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";

class Header extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    
    return(
      <header className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <nav className="container">
          <a className="navbar-brand" href="#">SEW</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  JOBS<span className="sr-only">(current) </span>
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link className="dropdown-item" to="/post-job">Post a Job</Link>
                  <a className="dropdown-item" href="#">Another action</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
              </li>
            </ul>
            <form className="form-inline my-2 my-md-0">
              <input className="form-control bg-light" type="text" placeholder="Search" aria-label="Search" />
            </form>
          </div>
        </nav>
      </header>
    )
  };
  
};
export default Header