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

export function votePost(postId, positive) {
    return dispatch => {
        dispatch(votePostsRequest(postId));

        return api.posts.vote(postId, positive)
            .then(post => dispatch(votePostsResult(postId, null, post.voteScore)))
            .catch(err => dispatch(votePostsResult(postId, err)));
    }
}

export function sortPosts(criteria) {
    return {
        type: types.SORTING_POSTS,
        criteria
    }
}

export function deletePost(postId) {
    return dispatch => {
        dispatch(deletePostRequest(postId));

        return api.posts.delete(postId)
            .then(post => dispatch(deletePostResult(postId, null)))
            .catch(err => dispatch(deletePostResult(postId, err)));

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

function votePostsResult(postId, error, score) {
    return {
        type: types.POSTS_VOTE_ONE,
        pending: false,
        error,
        score,
        postId
    };
}

function votePostsRequest(postId) {
    return {
        type: types.POSTS_VOTE_ONE,
        pending: true,
        postId
    };
}

function deletePostRequest(postId) {
    return {
        type: types.DELETE_ONE_POST,
        pending: true,
        postId
    };
}

function deletePostResult(postId, error) {
    return {
        type: types.DELETE_ONE_POST,
        pending: false,
        error,
        postId
    };
}