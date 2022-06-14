import React, {useRef, useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import userFacade from "../userFacade";

const CreateTenant = () => {
    const initialState = {name: "", phone: "", job: "", username: "", password: ""};
    const [tenant, setTenant] = useState(initialState);
    const [errorMsg, setErrorMsg] = useState("");
    const errorAlertMsg = useRef(null);
    const successAlertMsg = useRef(null);


    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setTenant({...tenant, [id]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        userFacade.createUser(tenant).then(response =>{
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
                    setTenant(initialState);
        })
    }



    return (
        <Container className="shadow-lg p-3 mb-5 bg-white rounded mt-5">
            <h2 className={"text-center" }>Add new Tenant</h2>
            <Form onChange={handleInput} onSubmit={handleSubmit}>
                <div ref={errorAlertMsg} className="alert alert-danger" style={{display:"none"}}>
                    <strong>{errorMsg}</strong>
                </div>
                <div ref={successAlertMsg} className="alert alert-success" style={{display:"none"}}>
                    <strong>User has been created</strong>
                </div>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="text" value={tenant.name}  placeholder="Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control required type="text" value={tenant.phone}  placeholder="Phone" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="job">
                    <Form.Label>Job</Form.Label>
                    <Form.Control required type="text" value={tenant.job}  placeholder="Job" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control required type="text" value={tenant.username}  placeholder="Username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" value={tenant.password}  placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add tenant
                </Button>

            </Form>

        </Container>
    );
};

export default CreateTenant;