import React, {useEffect, useState} from 'react';
import {Card, Container} from "react-bootstrap";

import {Link} from "react-router-dom";
import houseFacade from "../houseFacade";

const Houses = () => {
    const [houses,sethouses] = useState();
    useEffect(()=>{
        houseFacade.getAllHouses().then(houses => sethouses(houses))
    },[])


    return (
        <div>
            <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
                <div className={"mb-5"}>
                    <h1>All houses</h1>

                    <div className="cardList">
                        {
                            houses &&
                                houses.map((house)=>
                            <Card  style={{ width: '18rem' }} >
                                <Card.Body>
                                    <Card.Title>{house.id}</Card.Title>
                                    <Card.Text>
                                        Address: {house.address} <br/>
                                        City: {house.city} <br/>
                                        Amount of rooms: {house.rooms}
                                    </Card.Text>
                                    <Link to={"/houseInfoAdmin/"+house.id}
                                          key={house.id}
                                    >Se and update info</Link>

                                </Card.Body>
                            </Card>
                                )}


                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Houses;