import React, {useEffect, useRef, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import houseFacade from "../houseFacade";
import userFacade from "../userFacade";
import rentalFacade from "../RentalFacade";


const CreateRental = () => {

    const initialState = {start: "", end: "", price: "", deposit:"",contact:"",houseID:"",tenantID:""};
    const [rental,setRental] = useState(initialState);
    const[houses,setHouses] = useState();
    const[tenants,setTenants] = useState();
    const [errorMsg, setErrorMsg] = useState("");
    const errorAlertMsg = useRef(null);
    const successAlertMsg = useRef(null);

    useEffect(()=>{
        houseFacade.getAllHouses().then(houses => setHouses(houses));
        userFacade.getAllTenants().then(tenants => setTenants(tenants));
    },[])

    function handleInput(event) {
        const target = event.target
        const id = target.id
        const value = target.value
        setRental({...rental, [id]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        rentalFacade.createRental(rental).then(response =>{
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
            setRental(initialState);
        })
    }
    return (
            <div>
                <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">

                        <h1>Add new rental</h1>
                    <Form onChange={handleInput} onSubmit={handleSubmit}>
                        <div ref={errorAlertMsg} className="alert alert-danger" style={{display:"none"}}>
                            <strong>{errorMsg}</strong>
                        </div>
                        <div ref={successAlertMsg} className="alert alert-success" style={{display:"none"}}>
                            <strong>Rental has been created</strong>
                        </div>
                        <Form.Group className="mb-3" controlId="start">
                            <Form.Label>Start date</Form.Label>
                            <Form.Control required type="text" value={rental.start}  placeholder="dd/MM/yyyy" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="end">
                            <Form.Label>End date</Form.Label>
                            <Form.Control required type="text" value={rental.end}  placeholder="dd/MM/yyyy" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Annual price</Form.Label>
                            <Form.Control required type="number" value={rental.price}  placeholder="Annual price" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="deposit">
                            <Form.Label>Deposit</Form.Label>
                            <Form.Control required type="number" value={rental.deposit}  placeholder="Deposit" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="contact">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control required type="text" value={rental.contact}  placeholder="Contact" />
                        </Form.Group>

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

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="tenantID">Select tenant</Form.Label>
                            <Form.Select id="tenantID">
                                <option value={""} selected disabled hidden>Select tenant</option>
                                {tenants && tenants.map((tenant) => {
                                        return <option key={tenant.id}  value={tenant.id}>{tenant.id} - {tenant.name}, {tenant.phone}</option>
                                    }
                                )}
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Add rental
                        </Button>

                    </Form>
                </Container>
            </div>
    );
};

export default CreateRental;