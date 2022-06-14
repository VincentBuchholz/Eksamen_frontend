import settings from "./Settings";

function userFacade() {
    const URL = settings.getUrl();


    const createUser = (tenant) => {
        const options = makeOptions("POST", tenant,true); //True add's the token
        return fetch(URL + "api/user", options).then(r => r.json());
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

    }
}



const facade = userFacade();
export default facade;