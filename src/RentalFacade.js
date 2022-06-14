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

    const setHouse = (rentalID,houseID) => {
        const options = makeOptions("PUT",null,true); //True add's the token
        return fetch(URL + "api/rental/changehouse/"+rentalID+"/"+houseID, options).then(r => r.json());
    }

    const addTenant = (rentalID,tenantID) => {
        const options = makeOptions("PUT",null,true); //True add's the token
        return fetch(URL + "api/rental/addtenant/"+rentalID+"/"+tenantID, options).then(r => r.json());
    }

    const removeTenant = (rentalID,tenantID) => {
        const options = makeOptions("PUT",null,true); //True add's the token
        return fetch(URL + "api/rental/removetenant/"+rentalID+"/"+tenantID, options).then(r => r.json());
    }

    const deleteRental = (rentalID) => {
        const options = makeOptions("DELETE",null,true); //True add's the token
        return fetch(URL + "api/rental/delete/"+rentalID, options).then(r => r.json());
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
        setHouse,
        addTenant,
        removeTenant,
        deleteRental,


    }
}



const facade = rentalFacade();
export default facade;