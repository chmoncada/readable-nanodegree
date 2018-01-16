import React from 'react';
import PropTypes from 'prop-types';

const VoteStepper = function (props) {
    const disabledStepper = props.disable ? ' disabled' : '';

    return (
        <div className={'vote-stepper ' + (props.isSmall && 'small')}>
            <a onClick={() => props.onVote(true)} className={'waves-effect waves-light blue btn' + disabledStepper}><i className="material-icons">thumb_up</i></a>
            <span className="blue-text text-accent-2">{props.score}</span>
            <a onClick={() => props.onVote(false)} className={'waves-effect waves-light red btn' + disabledStepper}><i className="material-icons">thumb_down</i></a>
        </div>
    )
};

VoteStepper.propTypes = {
    score: PropTypes.number.isRequired,
    smallSize: PropTypes.bool,
    onVote: PropTypes.func.isRequired,
    disable: PropTypes.bool
};

export default VoteStepper;