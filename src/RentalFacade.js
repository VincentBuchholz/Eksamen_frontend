import settings from "./Settings";

function rentalFacade() {
    const URL = settings.getUrl();


    const getRentalsByUserID = (userID) => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "api/rental/rentals/"+userID, options).then(r => r.json());
    }

    const getHouseByRentalID = (rentalID) => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "api/rental/house/"+rentalID, options).then(r => r.json());
    }

    const getAllRentals = () => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "api/rental/all", options).then(r => r.json());
    }

    const getRentalByID = (rentalID) => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "api/rental/"+rentalID, options).then(r => r.json());
    }

    const updateRentalInfo = (rental) => {
        const options = makeOptions("PUT", rental,true); //True add's the token
        fetch(URL + "api/rental/updateinfo", options).then(r => r.json());
    }






    const makeOptions = (method, body, addToken) => {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (addToken) {
            opts.headers["x-access-token"] = localStorage.getItem("jwtToken");
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }

    return{
        getRentalsByUserID,
        getHouseByRentalID,
        getAllRentals,
        getRentalByID,
        updateRentalInfo,

    }
}



const facade = rentalFacade();
export default facade;