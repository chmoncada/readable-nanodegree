import uuid from 'uuid/v4';
import moment from 'moment';

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
            return fetch(`${baseUrl}/posts`, { headers })
                .then(requestHandler);
        },

        getByCategory (category) {
            return fetch(`${baseUrl}/${category}/posts`, { headers })
                .then(requestHandler);
        },

        vote(id, positive) {
            const data = {
                option: positive ? 'upVote' : 'downVote'
            };

            return fetch(`${baseUrl}/posts/${id}`, { method: 'POST', headers, body: JSON.stringify(data) })
                .then(requestHandler);
        },

        delete(id) {
            return fetch(`${baseUrl}/posts/${id}`, { method: 'DELETE', headers });
        },

        getPost(id) {
            return fetch(`${baseUrl}/posts/${id}`, { headers })
                .then(requestHandler);
        },

        create(title, body, author, category) {
            const data = {
                id: uuid(),
                timestamp: moment.utc().valueOf(),
                title,
                body,
                author,
                category,
            };

            return fetch(`${baseUrl}/posts`, { method: 'POST', headers, body: JSON.stringify(data) })
                .then(requestHandler);
        },

        update(id, title, body) {
            const data = {
                title,
                body
            };

            return fetch(`${baseUrl}/posts/${id}`, { method: 'PUT', headers, body: JSON.stringify(data) })
                .then(requestHandler);
        },

    },

    comments: {
        get(postId) {
            return fetch(`${baseUrl}/posts/${postId}/comments`, {headers})
                .then(requestHandler);
        },

        create(body, author, postId) {
            const data = {
                parentId: postId,
                id: uuid(),
                timestamp: moment.utc().valueOf(),
                body,
                author,
            };

            return fetch(`${baseUrl}/comments`, { method: 'POST', headers, body: JSON.stringify(data) })
                .then(requestHandler);
        },

        update(id, body) {
            const data = {
                timestamp: moment.utc().valueOf(),
                body
            };

            return fetch(`${baseUrl}/comments/${id}`, { method: 'PUT', headers, body: JSON.stringify(data) })
                .then(requestHandler);
        },

        delete(id) {
            return fetch(`${baseUrl}/comments/${id}`, { method: 'DELETE', headers });
        },

        vote(id, positive) {
            const data = {
                option: positive ? 'upVote' : 'downVote'
            };

            return fetch(`${baseUrl}/comments/${id}`, { method: 'POST', headers, body: JSON.stringify(data) })
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