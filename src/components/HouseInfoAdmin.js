import React, {useEffect, useState} from 'react';
import {Col, Container, Row, Table} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";
import rentalFacade from "../RentalFacade";

const HouseInfoAdmin = () => {

    const parms = useParams()
    const [currentTenants,setCurrentTenants] = useState()

    useEffect(()=>{
        rentalFacade.getCurrentTenantByHouseID(parms.houseID).then(currentTenants => setCurrentTenants(currentTenants));
    },[])

    return (
        <div>
            <div>
                <Container>
                    <Row >
                        <Col className="shadow-lg p-5 mb-5 bg-white rounded mt-5 me-3">
                    <div className={"mb-5"}>
                        <h1>House info for house nr: {parms.houseID}</h1>
                    </div>
                        </Col>

                        <Col className="shadow-lg p-5 mb-5 bg-white rounded mt-5 ms-5">
                            <h1>Current tenants in this house</h1>


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
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default HouseInfoAdmin;