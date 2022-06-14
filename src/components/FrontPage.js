import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import houseFacade from "../houseFacade";
import {Link} from "react-router-dom";


const FrontPage = () => {
    const[houses,setHouses] = useState();
    const[search,setSearch] = useState();
    const[searchHouses,setSearchHouses] = useState();
    const[housesFetched,setHousesFetched] = useState(false)

    useEffect(  () => {
       houseFacade.getAllHouses().then(houses => setHouses(houses))
    },[])

    if(houses && housesFetched === false) {
        setSearchHouses(houses)
        console.log(houses)
        setHousesFetched(true)
    }


    const handleSearch = (e) => {
        setSearchHouses(houses.filter(house => house.city.toLowerCase().includes(e.target.value)))
    }


    return (
        <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
                <Row>
                    <Col>

            <div className={"mb-5"}>
                <h1>Welcome to House rentals!</h1>
                <p>Feel free to take a look at all our beautiful houses</p>
            </div>
                    </Col>

                    <Col>
                        <h4>Serach by city</h4>
                        <Form>
                            <Form.Group className="mb-3" controlId="start">
                                <Form.Control required type="text" onChange={handleSearch}  placeholder="Search city" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>

            <div className="cardList">
                { searchHouses &&

                    searchHouses.map((house)=>
                        <Card  style={{ width: '18rem' }} >
                            <Card.Body>
                                <Card.Img variant="top" src={house.img}  alt="house-img"/>
                                <Card.Text>
                                    City: {house.city} <br/>
                                    Amount of rooms: {house.rooms}
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    )}


            </div>



        </Container>
    );
};

export default FrontPage;
