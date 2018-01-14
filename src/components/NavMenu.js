import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions/categoriesActions';

class NavMenu extends Component {

    componentDidMount () {
        this.props.fetchCategories();
    }

    render() {
        return (
            <nav className="App-header">
                <div className="nav-wrapper">
                    <Link className="brand-logo" to="/">Readable Udacity Project</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to="/">All</Link></li>
                        {this.props.categories.map(category => (
                            <li key={category.path}><Link to={{
                                pathname: '/',
                                search: '?category=' + category.path
                            }}>{category.name}</Link></li>
                        ))}
                    </ul>
                </div>
            </nav>

        );
    }
}

function mapStateToProps({categories}) {
    return {
        categories: categories.items
    }
}

export default connect(mapStateToProps, actions)(NavMenu);