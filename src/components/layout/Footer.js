import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  login,
  logout
} from '../../actions/auth';

const Footer = ({
  auth: { isLoggedIn, currentUser }
}) => {
  return (
    <footer className="footer">
      <div className="columns">
        <div className="column mid-column has-text-centered">
          <p>
            &copy;{new Date().getFullYear()} <a href="http://www.twitter.com/tannedoaksprout" rel="noopener noreferrer" target="_blank">Oaksprout the Tan</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  auth: PropTypes.object,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  null
)(Footer);