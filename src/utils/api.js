const baseUrl = "http://localhost:3001";

// Generate a token for storing data on the backend server.
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
        },

    },

    posts: {
        getAll () {
            console.log("deberia sacar todos los posts");
            return fetch(`${baseUrl}/posts`, { headers })
                .then(requestHandler);
        },

        getByCategory (category) {
            console.log('deberia sacar los posts de');
            console.log(category);
            return fetch(`${baseUrl}/${category}/posts`, { headers })
                .then(requestHandler);
        },
    },

    comments: {
        get(postId) {
            return fetch(`${baseUrl}/posts/${postId}/comments`, {headers})
                .then(requestHandler);
        },
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