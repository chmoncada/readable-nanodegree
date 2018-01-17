import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

class CommentsList extends Component {

    state = {
        showModal: false,
        editingComment: null
    };

    editComment(comment) {
        this.setState({
            editingComment: comment,
            showModal: true
        });
    }

    saveComment(comment, body) {
        this.props.onSaved(comment.id, body);

        this.setState({
            editingComment: null,
            showModal: false
        });
    }

    deleteComment(comment) {
        this.props.onDeleted(comment.id);
        this.setState({
            editingComment: null,
            showModal: false
        });
    }

    createComment(author, body) {
        this.props.onCreated(author, body);
    }

    closeModal = () => this.setState({showModal: false});

    render() {
        const { comments, onVoted } = this.props;

        const commentsList = comments.filter(comment => comment && !comment.deleted);
        commentsList.sort((a,b) =>
            a.timestamp - b.timestamp
        );

        return (
            <div className="section">
                <h5>Comments ({comments.length})</h5>
                <ul className="collection col s12 comments-container">
                    {commentsList.map(comment => (
                        <CommentItem key={comment.id}
                                 comment={comment}
                                 onVote={(id, p) => onVoted(id, p)}
                                 onEdit={() => this.editComment(comment)}
                        />
                    ))}
                    <li className="collection-item new-comment">
                        <span className="title">Add new comment</span>
                        <div className="row">
                            <CommentForm commentSaved={(author, body) => this.createComment(author, body)}/>
                        </div>
                    </li>
                </ul>

                <Modal
                    className='popup'
                    overlayClassName='overlay'
                    ariaHideApp={false}
                    isOpen={this.state.showModal}
                    onRequestClose={this.closeModal}
                    contentLabel='Modal'>

                    {this.state.showModal && (
                        <div className="new-comment">
                            <span className="close" onClick={this.closeModal}>X</span>
                            <h5 className="title">Edit comment</h5>
                            <CommentForm comment={this.state.editingComment} commentSaved={(author, body) => this.saveComment(this.state.editingComment, body)}/>
                            <a onClick={() => this.deleteComment(this.state.editingComment)} className="waves-light btn btn-modal red"><i className="material-icons right">delete</i>Delete</a>
                        </div>
                    )}
                </Modal>
            </div>
        )
    }
}

CommentsList.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.object),
    onVoted: PropTypes.func.isRequired,
    onCreated: PropTypes.func.isRequired,
    onSaved: PropTypes.func.isRequired,
    onDeleted: PropTypes.func.isRequired,
};

export default CommentsList;
