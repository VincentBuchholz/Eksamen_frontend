import React, {useEffect, useState} from 'react';
import {Container, Table} from "react-bootstrap";
import rentalFacade from "../RentalFacade";

const MyRentals = () => {
    const userID = localStorage.getItem("userID");
    const[rentals,setRentals] = useState();

    useEffect(()=>{
        rentalFacade.getRentalsByUserID(userID).then(rentals => setRentals(rentals));
    },[])


    return (
        <div>
            <Container className="shadow-lg p-5 mb-5 bg-white rounded mt-5">
                <div className={"mb-5"}>
                    <h1>My Rentals</h1>

                    {rentals &&

                    <Table bordered hover className="shadow p-3 mb-5 bg-white rounded mt-5">
                        <thead>
                        <tr>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Annual price</th>
                            <th>Deposit</th>
                            <th>Contact</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rentals &&
                            rentals.map((rental) =>
                                <tr key={rental.id}>
                                    <td>{rental.start}</td>
                                    <td>{rental.end}</td>
                                    <td>{rental.price}</td>
                                    <td>{rental.deposit}</td>
                                    <td>{rental.contact}</td>

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

export default MyRentals;