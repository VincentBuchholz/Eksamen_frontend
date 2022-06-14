import React, {useRef, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";

import userFacade from "../userFacade";
import houseFacade from "../houseFacade";


const CreateHouse = () => {
    const initialState = {address: "", city: "", rooms: "",img:""};
    const [house, setHouse] = useState(initialState);
    const errorAlertMsg = useRef(null);
    const successAlertMsg = useRef(null);
    const [errorMsg, setErrorMsg] = useState("");



    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setHouse({...house, [id]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        houseFacade.createHouse(house).then(response =>{
            const status = response.code;
            const msg = response.message;
            if(status){
                setErrorMsg(msg)
                errorAlertMsg.current.style.display = 'block';
                setTimeout(function() {errorAlertMsg.current.style.display = 'none'},3000)
            } else{
                successAlertMsg.current.style.display = 'block';
                setTimeout(function() {successAlertMsg.current.style.display = 'none'},3000)
            }
            setHouse(initialState);
        })

    }



    return (
        <Container className="shadow-lg p-3 mb-5 bg-white rounded mt-5">
            <h2 className={"text-center" }>Add new House</h2>
            <Form onChange={handleInput} onSubmit={handleSubmit}>
                <div ref={errorAlertMsg} className="alert alert-danger" style={{display:"none"}}>
                    <strong>{errorMsg}</strong>
                </div>
                <div ref={successAlertMsg} className="alert alert-success" style={{display:"none"}}>
                    <strong>House has been added</strong>
                </div>
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