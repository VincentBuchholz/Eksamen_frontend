import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";


const HomeCoach = () => {



    return (
        <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
            <div className={"mb-5"}>
                <h1>Welcome admin</h1>
                <p>Use the menu to see, edit and remove rentals and add new houses, tenants and rental agreements</p>
            </div>
        </Container>
    );
};

export default HomeCoach;