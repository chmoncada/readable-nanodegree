import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost, updatePost, createPost, clearCurrentPost } from '../actions/postFormActions';
import { isEmptyObj, getPostId } from '../utils/utils';

class PostForm extends Component {

    componentDidMount() {
        const { postId, fetchPost } = this.props;

        postId && fetchPost(postId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.saving && !this.props.saving && this.props.post) {
            ///this.props.history.push(`/${this.props.post.category}/${this.props.post.id}`);
            this.props.history.push('/');
        } else if (prevProps.deleting && !this.props.deleting && !this.props.post) {
            this.props.history.push('/');
        }
    }

    componentWillUnmount() {
        this.props.clearCurrentPost();
    }

    deletePost(e, postId) {
        e.preventDefault();

        this.props.deletePost(postId);
    }

    savePost(e, postId) {
        e.preventDefault();

        if (postId) {
            this.props.updatePost(postId, e.target.title.value, e.target.body.value);
        } else {
            this.props.createPost(e.target.title.value ,e.target.body.value, e.target.author.value, e.target.category.value);
        }
    }

    render() {
        const { postId, loading, categories, saving, deleting } = this.props;
        const post = postId ? this.props.post : {};

        if (loading) {
            return (<h5>Loading post data...</h5>);
        }
        else if (postId && (!post || isEmptyObj(post) || post.deleted)) {
            return (<h5>Ups! This post is no longer available</h5>);
        }

        return (
            <div className="row">
                <div className="col s12">
                    <h4>{ postId ? "Edit Post" : "Add New Post" }</h4>
                    <div className="card-panel">
                        <div className="row">
                            <form className="col s12" onSubmit={e => this.savePost(e, post.id)}>
                                <div className="input-field col s12">
                                    <input id="titleInput" type="text" name="title" defaultValue={post.title} className="validate" required placeholder="e.g. Udacity Nanodegree"/>
                                    <label className="active" htmlFor="titleInput">Title</label>
                                </div>
                                <div className="col s12">
                                    <label htmlFor="bodyInput">Body</label>
                                    <textarea rows="10" id="bodyInput" name="body" className="bodyField grey lighten-4" defaultValue={post.body} />
                                </div>
                                <div className="input-field col s8">
                                    <input id="authorInput" type="text" name="author" disabled={postId} defaultValue={post.author} className="validate" required placeholder="e.g. thingthree"/>
                                    <label className="active" htmlFor="authorInput">Author</label>
                                </div>
                                <div className="col s4">
                                    <label className="active" htmlFor="categorySelect">Category</label>
                                    <select id="categorySelect" className="browser-default" disabled={postId} name="category" defaultValue={post.category}>
                                        {categories.map(category => (<option key={category.path} value={category.path}>{category.name}</option>))}
                                    </select>
                                </div>
                                <div className="col s6">
                                    <button type="submit" disabled={saving || deleting} className="waves-effect waves-light btn blue"><i className="material-icons right">save</i>Save</button>
                                </div>

                                {postId && (
                                    <div className="col s6">
                                        <button onClick={e => this.deletePost(e, postId)} disabled={saving || deleting} className="waves-effect waves-light btn right red"><i className="material-icons right">delete</i>Delete</button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ postForm, categories }, ownProps) {
    const postId = getPostId(ownProps.location.pathname);
    const { post, loading, saving, deleting } = postForm;

    return {
        postId,
        loading,
        saving,
        deleting,
        categories: categories.items,
        post
    }
}

export default connect(mapStateToProps, { fetchPost, deletePost, updatePost, createPost, clearCurrentPost })(PostForm);
