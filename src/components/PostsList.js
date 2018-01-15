import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';

import PostItem from './PostItem';
import PostsSorter from './PostsSorter';

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

    sortingPosts(criteria) {
        this.props.sortPosts(criteria);
    }

    render() {
        if (this.props.loadingInfo) {
            return (<div>Posts Loading...</div>);
        } else {
            return (
                <div>
                    <div className="row">
                        <h2 className="header center">{this.props.category.name}</h2>
                        <PostsSorter initialValue={this.props.order} onOrderChanged={value => this.sortingPosts(value)}/>
                    </div>
                    <div className="row">
                        {this.props.posts.map(post => (
                            <PostItem key={post.id}
                                      id={post.id}
                                      title={post.title}
                                      category={post.category}
                                      author={post.author}
                                      timestamp={post.timestamp}
                                      comments={post.comments}
                                      onVote={(postId, positive) => this.props.votePost(postId, positive)}
                                      btnClick={() => this.props.deletePost(post.id)}
                                      score={post.voteScore}
                            />
                        ))}

                    </div>
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
    const sortingCriteria = posts.sortBy;

    const resultPosts = posts.items;
    resultPosts.sort((a, b) =>
        sortingCriteria === 'score' ? b.voteScore - a.voteScore : b.timestamp - a.timestamp
    );

    return {
        posts: resultPosts,
        category,
    };
}

export default connect(mapStateToProps, actions)(PostsList);