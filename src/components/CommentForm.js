import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentForm extends Component {
    createComment(e) {
        e.preventDefault();

        this.props.commentSaved(e.target.author.value, e.target.body.value);

        e.target.reset();
    }

    render() {
        const { author, body } = this.props.comment || {};

        return (
            <form onSubmit={e => this.createComment(e)}>
                <div className="input-field col s6">
                    <input id="authorInput" type="text" required disabled={this.props.comment !== undefined} name="author" defaultValue={author} className="validate" placeholder="e.g. thingthree"/>
                    <label className="active" htmlFor="authorInput">Author</label>
                </div>
                <div className="col s12">
                    <label htmlFor="bodyInput">Body</label>
                    <textarea id="bodyInput" name="body" required className="grey lighten-4" defaultValue={body} rows="5"/>
                </div>
                <div className="col s6">
                    <button type="submit" className="waves-effect waves-light btn blue"><i className="material-icons right">save</i>Save</button>
                </div>
            </form>
        );
    }
}

CommentForm.propTypes = {
    comment: PropTypes.object,
    commentSaved: PropTypes.func.isRequired
};

export default CommentForm;