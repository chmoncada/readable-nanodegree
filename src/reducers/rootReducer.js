import { combineReducers } from 'redux';

import categories from './categoriesReducer';
import posts from './postsReducer';

const rootReducer = combineReducers({
    categories,
    posts
});

export default  rootReducer;