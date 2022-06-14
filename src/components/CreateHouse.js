import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";

import userFacade from "../userFacade";
import houseFacade from "../houseFacade";

const CreateHouse = () => {
    const initialState = {address: "", city: "", rooms: "",img:""};
    const [house, setHouse] = useState(initialState);


    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setHouse({...house, [id]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        houseFacade.createHouse(house).catch(err => {
            console.log(err)
        });
        setHouse(initialState);
    }



    return (
        <Container className="shadow-lg p-3 mb-5 bg-white rounded mt-5">
            <h2 className={"text-center" }>Add new Tenant</h2>
            <Form onChange={handleInput} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control required type="text" value={house.address}  placeholder="Address" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control required type="text" value={house.city}  placeholder="city" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="rooms">
                    <Form.Label>Amount of rooms</Form.Label>
                    <Form.Control required type="number" value={house.rooms}  placeholder="Amount of rooms" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="img">
                    <Form.Label>Image url</Form.Label>
                    <Form.Control required type="text" value={house.img}  placeholder="Image url" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add house
                </Button>

            </Form>

        </Container>
    );
};

export default CreateHouse;