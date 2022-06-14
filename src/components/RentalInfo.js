import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {useParams} from "react-router-dom";
import rentalFacade from "../RentalFacade";
import houseFacade from "../houseFacade";
import userFacade from "../userFacade";


const RentalInfo = () => {
    const parms = useParams();
    const[rental,setRental] = useState();
    const[house,setHouse] = useState();
    const[houses,setHouses] = useState();
    const[newHouseID,setNewHouseID] = useState();
    const[currentTenants,setCurrentTenants] = useState();
    const[tenants, setTenants] = useState();
    const[newTenant,setNewTenant] = useState();
    const errorAlertMsg = useRef(null);
    const successAlertMsg = useRef(null);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(()=>{
        rentalFacade.getRentalByID(parms.rentalID).then(rental => setRental(rental));
        rentalFacade.getHouseByRentalID(parms.rentalID).then(house => setHouse(house));
        houseFacade.getAllHouses().then(houses => setHouses(houses));
        userFacade.getTenantsByRentalID(parms.rentalID).then(tenants => setCurrentTenants(tenants));
        userFacade.getAllTenants().then(tenants => setTenants(tenants));
    },[])


    function handleChangeRental(event) {
        const target = event.target
        const id = target.id
        const value = target.value
        setRental({...rental, [id]: value})

    }
    function handleSubmitRental(e) {
        e.preventDefault();
        rentalFacade.updateRentalInfo(rental).then(response =>{
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
        })

    }

    function handleChangeHouse(e) {
        setNewHouseID(e.target.value);
    }

    function handleSubmitHouse(e) {
        e.preventDefault();
        rentalFacade.setHouse(parms.rentalID,newHouseID);
        houseFacade.getHouseByID(newHouseID).then(house => setHouse(house));
    }

    function handleChangeAddTenant(event) {
        const target = event.target
        const value = target.value
        let selectedTenant = tenants.find(tenant => tenant.id === Number(value))
        setNewTenant(selectedTenant);
    }

    function handleSubmitAddTenant(e) {
        e.preventDefault();
        setCurrentTenants([...currentTenants,newTenant])
        rentalFacade.addTenant(parms.rentalID,newTenant.id);

    }

    const handleRemove = (e) => {
        const tenantID = e.target.value;
        rentalFacade.removeTenant(parms.rentalID,tenantID)
        if(currentTenants) {const newTenants = currentTenants.filter((tenant) => tenant.id != tenantID);
            setCurrentTenants(newTenants)}
    };
    return (
        <div>
            <Container >
                <div className={"mb-5"}>

                    <Row>

                        <Col className="shadow-lg p-5 mb-5 bg-white rounded mt-5 me-5">
                                <h1>Rental info for rental nr: {parms.rentalID}</h1>
                            {
                                rental &&
                                <Form onChange={handleChangeRental} onSubmit={handleSubmitRental}>
                                    <div ref={errorAlertMsg} className="alert alert-danger" style={{display:"none"}}>
                                        <strong>{errorMsg}</strong>
                                    </div>
                                    <div ref={successAlertMsg} className="alert alert-success" style={{display:"none"}}>
                                        <strong>Updated</strong>
                                    </div>
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
                        <Col className="shadow-lg p-5 mb-5 bg-white rounded mt-5 me-5">
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
                    <Row className="shadow-lg p-5 mb-5 bg-white rounded me-5 ">
                        <h3 className="mt-5">Tenants:</h3>

                        <Table bordered hover className="mt-2">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>phone</th>
                                <th>Job</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>


                            {currentTenants &&
                                currentTenants.map((tenant) =>
                                    <tr key={tenant.id}>
                                        <td>{tenant.name}</td>
                                        <td>{tenant.phone}</td>
                                        <td>{tenant.job}</td>
                                        <td><Button type="button" onClick={handleRemove} key={tenant.id} value={tenant.id} className="btn-danger">remove</Button></td>

                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>

                        {
                            tenants &&
                            <div>

                                <h4 className="mt-3"> Add tenant</h4>

                                <Form onChange={handleChangeAddTenant} onSubmit={handleSubmitAddTenant}>
                                    <Form.Group className="mb-3">
                                        <Form.Label htmlFor="tenants">Select tenant to add</Form.Label>
                                        <Form.Select id="tenants">
                                            <option value={""} selected disabled hidden>Select tenant</option>
                                            {
                                                tenants.map((tenant) => {
                                                        return <option key={tenant.id}  value={tenant.id}>{tenant.id} - {tenant.name} - {tenant.phone}</option>
                                                    }
                                                )}

                                        </Form.Select>
                                    </Form.Group>
                                    <Button type="submit">Add tenant</Button>
                                </Form>
                            </div>
                        }
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default RentalInfo;