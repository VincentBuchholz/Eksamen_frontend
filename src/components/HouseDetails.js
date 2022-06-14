import React, {useEffect, useState} from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import rentalFacade from "../RentalFacade";

const HouseDetails = () => {
    const parms = useParams();
    const [house, setHouse] = useState();

    useEffect(() => {
        rentalFacade.getHouseByRentalID(parms.rentalID).then(house => setHouse(house))
    }, [])

    return (
        <div>
            <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
                <div className={"mb-5"}>
                    <h1>House details for rental nr: {parms.rentalID}</h1>
                    {house &&
                        <div>

                            <Row className="mt-4">
                                <Col>
                                    <img src={house.img} alt="Picture of house" width="500px"/>
                                </Col>
                                <Col>
                                    <h4>Address:</h4>
                                    <p>{house.address}</p>
                                    <h4>City:</h4>
                                    <p>{house.city}</p>
                                    <h4>Amount of rooms</h4>
                                    <p>{house.rooms}</p>
                                </Col>
                            </Row>
                        </div>
                    }
                </div>
            </Container>
        </div>
    );
};

export default HouseDetails;