import {render} from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import apiFacade from "./apiFacade";

import Admin3 from "./components/Admin3";
import User2 from "./components/User2";
import User3 from "./components/User3";
import Houses from "./components/Houses";
import './waves.css'
import './cardList.css'
import MyRentals from "./components/MyRentals";
import HouseDetails from "./components/HouseDetails";
import HouseInfoAdmin from "./components/HouseInfoAdmin";
import CreateTenant from "./components/CreateTenant";

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
                <Route path="/admin3" element={<Admin3/>}/>
                <Route path="/myRentals" element={<MyRentals/>}/>
                <Route path="houseDetails/:rentalID" element={<HouseDetails/>}/>
                <Route path="/user2" element={<User2/>}/>
                <Route path="/user3" element={<User3/>}/>

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