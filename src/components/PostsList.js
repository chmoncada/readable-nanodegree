import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

import * as actions from '../actions/postActions';

class PostsList extends Component {

    componentDidMount() {
        if (!this.props.loadingInfo) {
            this.props.fetchPosts(this.props.category.path);
        }
    }

    componentDidUpdate(prevProps) {
        if (!this.props.loadingInfo && (!prevProps.category || this.props.category.path !== prevProps.category.path)) {
            this.props.fetchPosts(this.props.category.path);
        }
    }

    render() {
        if (this.props.loadingInfo) {
            return (<div>Cargando Posts</div>);
        } else {
            return (
                <div>
                    <p>Deberia mostrar los posts</p>
                </div>
            )
        }
    }
}

function mapStateToProps({posts, categories}, ownProps) {

    if (categories.loading || categories.items.length === 0) {
        return { loadingInfo: true }
    }

    const query = queryString.parse(ownProps.location.search);
    const category = (query.category && categories.items.find(category => category.path === query.category))
        || {name: 'All', path: null };

    return {
        posts,
        category,
    };
}

export default connect(mapStateToProps, actions)(PostsList);