import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../App.css';

import NavMenu from './NavMenu'

const App = function () {
    return (
        <BrowserRouter>
            <div>
                <NavMenu/>

            </div>
        </BrowserRouter>
    );
};

export default App;
