import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap'

import AdminPage from "./components/admin-page.component";
import ProfilePage from "./components/profile-page.component";
import LoginPage from './components/admin-login-page.component';
import WeekContainer from './components/week-container.component'

var auth = false;

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">Hamza Bajwa</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Profile</Nav.Link>
            <Nav.Link href="/login">Admin</Nav.Link>
            <Nav.Link href="/weather">Weather</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>

        </Navbar>
        <Route path="/" exact component={ProfilePage} />
        <Route path="/admin" render = {() => (auth ?  (<AdminPage />) : (<Redirect to="/login" />))}/>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/weather" exact component={WeekContainer} />
        {/* <Navbar />
        <br />
        <Route path="/" exact component={ProfilePage} />
        <Route path="/admin" exact component={AdminPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/weather" exact component={WeekContainer} /> */}
      </div>
    </Router>
  );
}

export default App;
