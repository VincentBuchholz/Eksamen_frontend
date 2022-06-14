import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

const Header = ({logout}) => {
    const userType = localStorage.getItem("userType");
    let isAdmin = false;
    if(userType === "admin"){
        isAdmin = true;
    }


    return (
        <div>
            <Navbar expand="lg" style={{backgroundColor:"white !important" }} className={"m-auto w-50"}>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto m-auto">
                        {
                            isAdmin &&
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                        }
                        {
                            isAdmin &&

                            <LinkContainer to="/houses">
                                <Nav.Link>Houses</Nav.Link>
                            </LinkContainer>

                        }
                        {
                            isAdmin &&
                            <LinkContainer to="/createTenant">
                                <Nav.Link>Add Tenant</Nav.Link>
                            </LinkContainer>
                        }
                        {
                            isAdmin &&
                            <LinkContainer to="/createHouse">
                                <Nav.Link>Add house</Nav.Link>
                            </LinkContainer>
                        }
                        {
                            isAdmin &&
                            <LinkContainer to="/createRental">
                                <Nav.Link>Add rental</Nav.Link>
                            </LinkContainer>
                        }
                        {
                            isAdmin &&
                            <LinkContainer to="/rentals">
                                <Nav.Link>Rentals</Nav.Link>
                            </LinkContainer>
                        }



                        {
                            !isAdmin &&

                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>

                        }
                        {
                            !isAdmin &&

                            <LinkContainer to="/myRentals">
                                <Nav.Link>My Rentals</Nav.Link>
                            </LinkContainer>

                        }
                        <Button className="float-end" onClick={logout}>Log out</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Outlet/>
        </div>
    );
};

export default Header;