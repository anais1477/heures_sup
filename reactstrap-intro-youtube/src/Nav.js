import React from 'react';
import Export from './Export';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { slide as Menu } from 'react-burger-menu';
import {
    Route,Switch,
    Link,
    BrowserRouter as Router,
} from 'react-router-dom';

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
    showSettings (event) {
        event.preventDefault();

    }
  render() {
    return (
/*<div>
        <Menu>
            <a id="home" className="menu-item" href="/">Home</a>
            <a id="about" className="menu-item" href="/about">About</a>
            <a id="contact" className="menu-item" href="/contact">Contact</a>
            <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
        </Menu></div>*/
        <div>
          <Navbar color="faded" light toggleable color="info">
            <NavbarToggler left onClick={this.toggle} />
            <NavbarBrand right href="/">Courroie BT</NavbarBrand>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/components/">Mes heures sup</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/export/">Export</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
<Router>
            <Switch>
                <Route path="/export" component={Export}/></Switch></Router>
        </div>
    );
  }
}
