import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import rentals from "./Rentals";
import rentalFacade from "../RentalFacade";
import houseFacade from "../houseFacade";

const RentalInfo = () => {
    const parms = useParams();
    const[rental,setRental] = useState();
    const[house,setHouse] = useState();
    const[houses,setHouses] = useState();
    const[newHouseID,setNewHouseID] = useState();

    useEffect(()=>{
        rentalFacade.getRentalByID(parms.rentalID).then(rental => setRental(rental));
        rentalFacade.getHouseByRentalID(parms.rentalID).then(house => setHouse(house));
        houseFacade.getAllHouses().then(houses => setHouses(houses));
    },[])


    function handleChangeRental(event) {
        const target = event.target
        const id = target.id
        const value = target.value
        setRental({...rental, [id]: value})

    }
    function handleSubmitRental(e) {
        e.preventDefault();
        rentalFacade.updateRentalInfo(rental)

    }

    function handleChangeHouse(e) {
        setNewHouseID(e.target.value);
    }

    function handleSubmitHouse(e) {
        e.preventDefault();
        rentalFacade.setHouse(parms.rentalID,newHouseID);
    }
    return (
        <div>
            <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
                <div className={"mb-5"}>

                    <Row>

                        <Col>
                                <h1>Rental info for rental nr: {parms.rentalID}</h1>
                            {
                                rental &&
                                <Form onChange={handleChangeRental} onSubmit={handleSubmitRental}>
                                <Form.Group className="mb-3" controlId="start">
                                <Form.Label>Start date</Form.Label>
                                <Form.Control required type="text" value={rental.start}
                                />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="end">
                                <Form.Label>End date</Form.Label>
                                <Form.Control required type="text" value={rental.end}
                                />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="price">
                                <Form.Label>Annual price</Form.Label>
                                <Form.Control required type="text" value={rental.price} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="deposit">
                                <Form.Label>Deposit</Form.Label>
                                <Form.Control required type="text" value={rental.deposit} />
                                </Form.Group>

                                <Button type="submit">Update info</Button>
                                </Form>
                            }
                        </Col>
                        <Col>
                            {
                                house &&
                                <div className="ms-3">
                                    <h1>House info:</h1>

                                <h5>House nr: {house.id}</h5>
                                <h5>Address: {house.address}</h5>
                                <h5>City: {house.city}</h5>
                                <h5>Amount of rooms: {house.rooms}</h5>

                                    <h3 className="mt-5">Change house</h3>
                                    <Form onChange={handleChangeHouse} onSubmit={handleSubmitHouse} >
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="houseID">Select house</Form.Label>
                                            <Form.Select id="houseID">
                                                <option value={""} selected disabled hidden>Select house</option>
                                                {houses && houses.map((house) => {
                                                        return <option key={house.id}  value={house.id}>{house.id} - {house.address}, {house.city}</option>
                                                    }
                                                )}
                                            </Form.Select>
                                        </Form.Group>
                                        <Button type="submit">Change house</Button>
                                    </Form>

                                </div>
                            }

                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default RentalInfo;