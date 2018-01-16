import { combineReducers } from 'redux';

import categories from './categoriesReducer';
import posts from './postsReducer';
import postForm from './postFormReducer';

const rootReducer = combineReducers({
    categories,
    posts,
    postForm
});

export default  rootReducer;