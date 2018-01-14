import initialState from '../store/initialState';
import * as types from '../actions/postTypes';

const postsReducer = function (state = initialState.posts, action) {
    switch (action.type) {
        case types.FETCH_POSTS: {
            const { error, posts, pending } = action;

            return {
                ...state,
                loading: pending,
                error: pending ? null : error,
                items: pending ? [] : (posts || [])
            }
        }
        default:
            return state;
    }
};

export default postsReducer;