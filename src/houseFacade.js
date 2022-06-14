import settings from "./Settings";

function houseFacade() {
    const URL = settings.getUrl();

    const getAllHouses = () => {
        const options = makeOptions("GET"); //True add's the token
        return fetch(URL + "api/house/all", options).then(r => r.json());
    }

    const createHouse = (house) => {
        const options = makeOptions("POST", house,true); //True add's the token
        return fetch(URL + "api/house/create", options).then(r => r.json());
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
        getAllHouses,
        createHouse

    }
}



const facade = houseFacade();
export default facade;