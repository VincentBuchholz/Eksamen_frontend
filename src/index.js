import {render} from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import apiFacade from "./apiFacade";

import Houses from "./components/Houses";
import './waves.css'
import './cardList.css'
import MyRentals from "./components/MyRentals";
import HouseDetails from "./components/HouseDetails";
import HouseInfoAdmin from "./components/HouseInfoAdmin";
import CreateTenant from "./components/CreateTenant";
import CreateHouse from "./components/CreateHouse";
import Rentals from "./components/Rentals";
import RentalInfo from "./components/RentalInfo";
import CreateRental from "./components/CreateRental";

const rootElement = document.getElementById("root");
const loggedIn = apiFacade.loggedIn()

render(
    <BrowserRouter>
        <Routes>
            <Route exact="true" path="/" element={<App/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/houses" element={<Houses/>}/>
                <Route path="houseInfoAdmin/:houseID" element={<HouseInfoAdmin/>}/>
                <Route path="/createTenant" element={<CreateTenant/>}/>
                <Route path="/createHouse" element={<CreateHouse/>}/>
                <Route path="createRental" element={<CreateRental/>} />
                <Route path="rentals" element={<Rentals/>}/>
                <Route path="rentalInfo/:rentalID" element={<RentalInfo/>}/>
                <Route path="/myRentals" element={<MyRentals/>}/>
                <Route path="houseDetails/:rentalID" element={<HouseDetails/>}/>

            </Route>
            <Route
                path="*"
                element={
                    <main style={{padding: "1rem"}}>
                        <p>There's nothing here!</p>
                    </main>
                }
            />
        </Routes>
    </BrowserRouter>,
    rootElement
);