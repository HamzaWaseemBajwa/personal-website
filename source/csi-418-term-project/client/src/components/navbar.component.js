import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Hamza Bajwa</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav flex-row">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Profile</Link>
          </li>
          <li className="navbar-item">
          <Link to="/login" className="nav-link">Admin</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}