import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../App.css';

import NavMenu from './NavMenu';
import PostsList from './PostsList';

const App = function () {
    return (
        <BrowserRouter>
            <div>
                <NavMenu/>
                <div className="container">
                    <Route exact path="/" component={PostsList}/>
                </div>

            </div>
        </BrowserRouter>
    );
};

export default App;
