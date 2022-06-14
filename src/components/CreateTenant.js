import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import userFacade from "../userFacade";

const CreateTenant = () => {
    const initialState = {name: "", phone: "", job: "", username: "", password: ""};
    const [tenant, setTenant] = useState(initialState);


    const handleInput = (event) => {
        const target = event.target
        const id = target.id
        const value = target.value
        setTenant({...tenant, [id]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        userFacade.createUser(tenant).catch(err => {
            console.log(err)
        });
        setTenant(initialState);
    }



    return (
        <Container className="shadow-lg p-3 mb-5 bg-white rounded mt-5">
            <h2 className={"text-center" }>Add new Tenant</h2>
            <Form onChange={handleInput} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="text" value={tenant.name}  placeholder="Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control required type="text" value={tenant.phone}  placeholder="Lastname" />
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
                    Create client
                </Button>

            </Form>

        </Container>
    );
};

export default CreateTenant;