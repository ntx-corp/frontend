import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class Footer extends Component {
    render() {

        // eslint-disable-next-line
        const { children, ...attributes } = this.props;

        return (
            <React.Fragment>
                <span><a href="#">TX</a> &copy; 2019 creativeLabs.</span>
                <span className="ml-auto">Design by <a href="#">TX</a></span>
            </React.Fragment>
        );
    }
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
