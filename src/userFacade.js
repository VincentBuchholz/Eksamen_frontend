import settings from "./Settings";

function userFacade() {
    const URL = settings.getUrl();


    const createUser = (tenant) => {
        const options = makeOptions("POST", tenant,true); //True add's the token
        return fetch(URL + "api/user", options).then(r => r.json());
    }

    const getAllTenants = () => {
        const options = makeOptions("GET", null,true); //True add's the token
        return fetch(URL + "api/user/all", options).then(r => r.json());
    }
    const getTenantsByRentalID= (rentalID) => {
        const options = makeOptions("GET", null,true); //True add's the token
        return fetch(URL + "api/user/"+rentalID, options).then(r => r.json());
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
        createUser,
        getAllTenants,
        getTenantsByRentalID,

    }
}



const facade = userFacade();
export default facade;