import {render} from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import apiFacade from "./apiFacade";
import Admin2 from "./components/Admin2";
import Admin3 from "./components/Admin3";
import User2 from "./components/User2";
import User3 from "./components/User3";
import Admin1 from "./components/Admin1";
import './waves.css'
import MyRentals from "./components/MyRentals";
import HouseDetails from "./components/HouseDetails";

const rootElement = document.getElementById("root");
const loggedIn = apiFacade.loggedIn()

render(
    <BrowserRouter>
        <Routes>
            <Route exact="true" path="/" element={<App/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/admin1" element={<Admin1/>}/>
                <Route path="/admin2" element={<Admin2/>}/>
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