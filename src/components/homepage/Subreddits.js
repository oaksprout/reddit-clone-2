import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchSubreddits } from '../../actions/subreddits';

const Subreddits = ({
  fetchSubreddits,
  subreddits: { subreddits, isLoading }
}) => {
  useEffect(() => {
    fetchSubreddits();
  }, [fetchSubreddits]);
  const render = !isLoading && (
    <ol>
      { subreddits.map((sub) => {
        return (
          <>
            <li key={sub.id}>
              <Link to={`/r/${sub.name}`}>
                { sub.name }
              </Link>
            </li>
          </>
        )
      }) }
    </ol>
  )
  return (
    <section className="section">
      <h1>Subreddits</h1>
      { render }
    </section>
  )
}

Subreddits.propTypes = {
  fetchSubreddits: PropTypes.func.isRequired,
  subreddits: PropTypes.object,
}

const mapStateToProps = state => {
  console.log(state);
  return {
    subreddits: state.subreddits
  }
}

export default connect(
  mapStateToProps,
  { fetchSubreddits }
)(Subreddits);