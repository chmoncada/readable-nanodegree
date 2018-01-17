import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/postFormActions';
import {getPostId} from "../utils/utils";
import moment from "moment/moment";
import { isEmptyObj} from "../utils/utils";

import VoteStepper from './VoteStepper';
import CommentsList from './CommentsList';

class PostDetails extends Component {

    componentDidMount() {
        this.props.fetchPost(this.props.postId);
    }

    delete() {
        this.props.deletePost(this.props.postId);
    }

    edit() {
        this.props.history.push(`/${this.props.post.category}/${this.props.postId}/edit`);
    }

    vote(positive) {
        this.props.votePost(this.props.postId, positive);
    }

    render() {

        const { post, loading, comments, addComment, updateComment, deleteComment, voteComment } = this.props;
        if (loading) {
            return (<h5>Loading post details...</h5>);
        } else if (!post || isEmptyObj(post) || post.deleted) {
            return (<h5>Ups! This post is no longer available</h5>);
        }

        const creationDate = moment(post.timestamp).format("LLL");
        const commentsArray = Object.keys(comments.items).map(commentId => comments.items[commentId]);

        return (
            <div className="col s12">
                <h4 className="header post-title">{post.title}</h4>
                <div className="card row">
                    <div className="card-content">
                        <div className="row" style={{marginBottom: 0}}>
                            <div className="col s12">
                                <div>
                                    <p className="grey-text text-lighten-1">{creationDate}</p>
                                    <p className="author-detail">{post.author}</p>
                                    <p >{post.body}</p>
                                </div>
                                <VoteStepper className="stepper-card-element" score={post.voteScore} disable={post.voting} onVote={p => this.vote(p)}/>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <div className="col s6">
                            <button onClick={() => this.edit()} type="submit" className="waves-effect waves-light btn blue"><i className="material-icons right">edit</i>Edit</button>
                        </div>
                        <div className="col s6">
                            <button onClick={() => this.delete()} className="waves-effect waves-light btn right red"><i
                                className="material-icons right">delete</i>Delete
                            </button>
                        </div>
                    </div>
                </div>
                <CommentsList comments={commentsArray}
                              onCreated={(author, body) => addComment(body, author, post.id)}
                              onSaved={(id, body) => updateComment(id, body)}
                              onVoted={(id, positive) => voteComment(id, positive)}
                              onDeleted={id => deleteComment(id)}
                />
            </div>
        )
    }
}

function mapStateToProps({postForm}, ownProps) {
    const postId = getPostId(ownProps.location.pathname);
    const { post, loading, comments, voting, deleting } = postForm;

    return {
        postId,
        post,
        loading,
        deleting,
        voting,
        comments
    }
}

export default connect(mapStateToProps, actions)(PostDetails);