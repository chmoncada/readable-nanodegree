import React from 'react';
import PropTypes from 'prop-types';

const PostsSorter = function (props) {
    return (
        <div className="col s12 m4">
            <label>Sort by</label>
            <select defaultValue={props.initialValue} onChange={(e) => props.onOrderChanged(e.target.value)} className="browser-default">
                <option value="score">Score</option>
                <option value="date">Date</option>
            </select>
        </div>
    );
};

PostsSorter.propTypes = {
    onOrderChanged: PropTypes.func.isRequired,
};

export default PostsSorter;