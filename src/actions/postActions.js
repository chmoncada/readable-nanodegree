import api from '../utils/api';
import * as types from './postTypes';

export function fetchPosts(category) {
    return dispatch => {
        dispatch(fetchPostsRequest());

        const promise = category ? api.posts.getByCategory(category) : api.posts.getAll();

        return promise
            .then(posts => {
                const promises = posts.map(post => api.comments.get(post.id));
                Promise.all(promises)
                    .then(results => {
                        results.forEach((comments, index) => posts[index].comments = comments.length);
                        dispatch(fetchPostsResult(null, posts));
                    })
            })
            .catch(err => dispatch(fetchPostsResult(err)));
    }
}

function fetchPostsRequest() {
    return {
        type: types.FETCH_POSTS,
        pending: true
    };
}

function fetchPostsResult(error, posts = null) {
    return {
        type: types.FETCH_POSTS,
        pending: false,
        error,
        posts
    };
}