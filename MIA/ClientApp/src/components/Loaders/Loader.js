import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Loader.scss';

const Loader = ({terminate}) => {
    return(
        <div className={classNames('preloader', { 'preloader--visible': !terminate })}>
            <div className="preloader-back"></div>
        </div>
    )
}

Loader.propTypes = {
    terminate: PropTypes.bool,
}

export default Loader;