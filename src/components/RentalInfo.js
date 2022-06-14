import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import rentals from "./Rentals";
import rentalFacade from "../RentalFacade";

const RentalInfo = () => {
    const parms = useParams();
    const[rental,setRental] = useState();

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


    useEffect(()=>{
        rentalFacade.getRentalByID(parms.rentalID).then(rental => setRental(rental))
    },[])
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

                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default RentalInfo;