import React, {useEffect, useState} from 'react';
import {Button, Container, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import rentalFacade from "../RentalFacade";

const Rentals = () => {
    const[rentals,setRentals] = useState();

    useEffect(()=>{
        rentalFacade.getAllRentals().then(rentals => setRentals(rentals))
    },[])

    const handleRemove = (e) => {
        const rentalID = e.target.value;
        rentalFacade.deleteRental(rentalID)
        if(rentals) {const newRentals = rentals.filter((rental) => rental.id != rentalID);
            setRentals(newRentals)}
    };
    return (
        <div>
            <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
                <div className={"mb-5"}>
                    <h1>All rental agreements</h1>

                    {rentals &&

                        <Table bordered hover className="shadow p-3 mb-5 bg-white rounded mt-5">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Annual price</th>
                                <th>Deposit</th>
                                <th>Contact</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {rentals &&
                                rentals.map((rental) =>
                                    <tr key={rental.id}>
                                        <td>{rental.id}</td>
                                        <td>{rental.start}</td>
                                        <td>{rental.end}</td>
                                        <td>{rental.price}</td>
                                        <td>{rental.deposit}</td>
                                        <td>{rental.contact}</td>
                                        <td>
                                        <Link to={"/rentalInfo/"+rental.id}
                                              key={rental.id}
                                        >Change</Link>
                                        </td>
                                        <td><Button type="button" onClick={handleRemove} key={rental.id} value={rental.id} className="btn-danger">remove</Button></td>

                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    }


                </div>
            </Container>
        </div>
    );
};

export default Rentals;