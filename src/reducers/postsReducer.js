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
        case types.POSTS_VOTE_ONE: {
            const { error, score, postId, pending } = action;

            if (pending) {
                return {
                    ...state,
                    voting: [
                        ...state.voting,
                        postId
                    ],
                    error: null
                }
            } else {
                return {
                    ...state,
                    error,
                    voting: state.voting.filter(item => item !== postId),
                    items: state.items.map(item => !error && postId === item.id ? {...item, voteScore: score} : item)
                }
            }
        }
        case types.SORTING_POSTS:
            return {
                ...state,
                sortBy: action.criteria
            };
        case types.DELETE_ONE_POST: {
            const { error, postId, pending } = action;

            if (pending) {
                return {
                    ...state,
                    error: null
                }
            } else {
                return {
                    ...state,
                    error,
                    items: state.items.filter(item => !error && postId !== item.id)
                }
            }
        }
        default:
            return state;
    }
};

export default postsReducer;