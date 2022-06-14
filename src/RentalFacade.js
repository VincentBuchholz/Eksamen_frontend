import settings from "./Settings";

function rentalFacade() {
    const URL = settings.getUrl();


    const getRentalsByUserID = (userID) => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "api/rental/rentals/"+userID, options).then(r => r.json());
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

    }
}



const facade = rentalFacade();
export default facade;