import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment'

import VoteStepper from './VoteStepper';

const PostItem = function (props) {
    const coloquialTime = moment(props.timestamp).fromNow();

    return (
        <div key={props.id} className="col s12">
            <div className="card" style={{marginBottom: 30}}>
                <div className="btn-floating halfway-fab btn-large blue">
                    <Link to={{pathname: `/${props.category}/${props.id}/edit`}}>
                        <i className="material-icons">edit</i>
                    </Link>
                </div>
                <a className="btn-floating close-btn red">
                    <i onClick={props.btnClick} className="material-icons">close</i>
                </a>
                <div className="card-content">
                    <div className="row" style={{marginBottom: 0}}>
                        <div className="col s12">
                            <small className="grey-text text-lighten-1">{coloquialTime} by <b>{props.author}</b></small>
                            <p>{props.title}</p>
                            <span className="new badge red" data-badge-caption={'Comments: ' + props.comments} />
                            <Link className="blue-text text-accent-1" to={{pathname: `/${props.category}/${props.id}`}}>Read more</Link>
                        </div>
                    </div>
                </div>
                <div className="card-action" style={{marginBottom: 0}}>
                    <VoteStepper score={props.score} disable={props.voting} onVote={p => props.onVote(props.id, p)} isSmall/>
                </div>
            </div>
        </div>
    );
};

PostItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    onVote: PropTypes.func.isRequired,
};

export default PostItem;