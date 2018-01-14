const baseUrl = "http://localhost:3001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token) {
    token = localStorage.token = Math.random().toString(36).substr(-8);
}

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': token
};

const API = {
    categories: {
        getAll () {
            return fetch(`${baseUrl}/categories`, { headers })
                .then(requestHandler)
                .then(data => data.categories);
        }
    },


};

function requestHandler(res) {
    if (res.status !== 200) {
        throw res.statusText;
    } else {
        return res.json()
    }
}

export default API;