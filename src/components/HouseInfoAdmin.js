import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import rentalFacade from "../RentalFacade";
import houseFacade from "../houseFacade";

const HouseInfoAdmin = () => {

    const parms = useParams()
    const [currentTenants, setCurrentTenants] = useState()
    const [house, setHouse] = useState();
    const [rentals, setRentals] = useState();

    useEffect(() => {
        rentalFacade.getCurrentTenantByHouseID(parms.houseID).then(currentTenants => setCurrentTenants(currentTenants));
        rentalFacade.getRentalByHouseID(parms.houseID).then(rentals => setRentals(rentals));
        houseFacade.getHouseByID(parms.houseID).then(house => setHouse(house));
    }, [])

    return (
        <div>
            <div>
                <Container>
                    <Row>
                        <Col className="shadow-lg p-5 mb-5 bg-white rounded mt-5 me-3">
                            <div className={"mb-5"}>
                                <h1>Info for house nr: {parms.houseID}</h1>
                                {house &&
                                    <div>
                                        <h5>Address: {house.address}</h5>
                                        <h5>City: {house.city}</h5>
                                        <h5>Amount of rooms: {house.rooms}</h5>

                                    </div>

                                }
                            </div>
                        </Col>

                        <Col className="shadow-lg p-5 mb-5 bg-white rounded mt-5 ms-5">
                            <h1>Current tenants in this house</h1>

                            {currentTenants &&
                                <Table bordered hover className="">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Job</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {currentTenants &&
                                        currentTenants.map((tenant) =>
                                            <tr key={tenant.id}>
                                                <td>{tenant.id}</td>
                                                <td>{tenant.name}</td>
                                                <td>{tenant.phone}</td>
                                                <td>{tenant.job}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            }
                        </Col>
                    </Row>


                    <Row className="shadow-lg p-5 mb-5 bg-white rounded mt-5 me-3">
                        <h3>All rental agreements for this house:</h3>
                        {rentals &&

                            <Table bordered hover className="shadow p-3 mb-5 bg-white rounded mt-5">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Annual price</th>
                                    <th>Deposit</th>
                                    <th>Contact</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {rentals &&
                                    rentals.map((rental) =>
                                        <tr key={rental.id}>
                                            <td>{rental.id}</td>
                                            <td>{rental.start}</td>
                                            <td>{rental.end}</td>
                                            <td>{rental.price}</td>
                                            <td>{rental.deposit}</td>
                                            <td>{rental.contact}</td>
                                            <td>
                                                <Link to={"/rentalInfo/"+rental.id}
                                                      key={rental.id}
                                                >Change</Link>
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </Table>
                        }
                    </Row>


                </Container>
            </div>
        </div>
    );
};

export default HouseInfoAdmin;