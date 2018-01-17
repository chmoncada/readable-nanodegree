import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import VoteStepper from './VoteStepper';

const CommentItem = function(props) {
    const {timestamp, author, id, voteScore, body} = props.comment;

    const dateString = moment(timestamp).format('LLL');

    return (
        <li className="collection-item avatar comment">
            <i className="material-icons" onClick={() => props.onEdit()}>edit</i>
            <span className="author-detail">{author}</span>
            <p>
                {body}
            </p>
            <label>{dateString}</label>
            <VoteStepper score={voteScore} onVote={p => props.onVote(id, p)} isSmall/>
        </li>
    );
};

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    onVote: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};

export default CommentItem;