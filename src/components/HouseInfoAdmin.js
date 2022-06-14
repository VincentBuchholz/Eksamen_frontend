import React from 'react';
import {Container} from "react-bootstrap";
import {useParams} from "react-router-dom";

const HouseInfoAdmin = () => {
    const parms = useParams()
    return (
        <div>
            <div>
                <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
                    <div className={"mb-5"}>
                        <h1>House info for house nr: {parms.houseID}</h1>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default HouseInfoAdmin;