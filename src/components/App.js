import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../App.css';

import NavMenu from './NavMenu';
import PostsList from './PostsList';
import PostForm from './PostForm';

const App = function () {
    return (
        <BrowserRouter>
            <div>
                <NavMenu/>
                <div className="container">
                    <Route exact path="/" component={PostsList}/>
                    <Route exact path="/new-post" component={PostForm}/>
                    <Route exact path="/:category/:post/edit" component={PostForm}/>
                </div>

            </div>
        </BrowserRouter>
    );
};

export default App;
