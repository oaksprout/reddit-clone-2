import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Container from '../layout/Container';
import Hero from '../layout/Hero';
import Posts from './Posts';
import PostForm from './PostForm';

import { connect } from 'react-redux';
import {
  fetchSubreddits,
  fetchSubreddit,
  deleteSubreddit
} from '../../actions/subreddits';
import {
  deletePost,
  fetchSubredditPosts
} from '../../actions/posts';
import { fetchUsers } from '../../actions/users';
import {
  fetchVotes
} from '../../actions/votes';
import { login } from '../../actions/auth';


const Subreddit = ({
  fetchSubredditPosts,
  fetchSubreddits,
  fetchSubreddit,
  fetchUsers,
  fetchVotes,
  deletePost,
  deleteSubreddit,
  subreddits: { subreddits, subreddit, isLoading },
  auth: { currentUser, isLoggedIn },
  users: { users },
  votes: { votes },
  posts: { posts }
}) => {
  let name = useParams();
  let history = useHistory();
  useEffect(() => {
    fetchSubreddit(name);
    fetchSubreddits();
    fetchUsers();
    fetchVotes();
  }, [
    fetchSubreddit,
    fetchSubreddits,
    fetchUsers,
    fetchVotes,
    name
  ]);
  useEffect(() => {
    if (subreddit !== null) fetchSubredditPosts(subreddit.id)
  }, [fetchSubredditPosts, subreddit])
  
  // Create post form
  let [showForm, toggleShowForm] = useState(false);

  // Search form
  let [search, setSearch] = useState('');
  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  return (
    <section>
      <Hero
        small
      >
        <div className="hero-body"  style={{backgroundColor: 'black', color: 'white'}}>
          <div className="container">
            <h1 className="title is-capitalized" style={{color: 'white'}}>Inscriptions of Temple Sacrifice</h1>
            <h4 style={{fontWeight: 300, color: 'white', lineHeight: 1.3}}>Cast Votes on Temple Offerings to Help Templars<br />Discover Top Fire Ritual Candidates</h4>
            {/* {
              (isLoading || subreddit === null) ? (
                <h1 className="title">Loading...</h1>
              ) : (!isLoading && Object.keys(subreddit).length === 0) ? (
                <>
                  <h1 className="is-capitalized">
                    This Subreddit does not exist yet
                  </h1>
                  <p className="button is-warning">Create it Here</p>
                </>
              ) : (
                <h1 className=" title is-capitalized">{ subreddit.name }</h1>
              )
            } */}
            {/* {
              (subreddit !== null && currentUser.id === subreddit.user_id) && (
                <button className="button is-danger" onClick={() => deleteSubreddit(subreddit.id, history)}>Delete Subreddit</button>
              )
            } */}
          </div>
        </div>
      </Hero>
      <Container>
        {
          isLoggedIn ? (
            <button
              className="button is-primary"
              onClick={() => toggleShowForm(!showForm)}
            >
              { showForm ? ('Cancel') : ('Inscribe an Offering') }
            </button>
          ) : 
          <div>Sign In to Inscribe an Offering</div>
        }
        {
          showForm && (
            <PostForm
              toggleShowForm={toggleShowForm}
              subreddit={subreddit}
            />
          )
        }
        <form className="form">
          <div className="control" style={{width: 400}}>
            <input
              type="text"
              className="input search-box"
              placeholder="Search"
              value={search}
              onChange={event => handleChange(event)}
            />
          </div>
        </form>
        {
          (posts.length !== 0 && subreddit !== null) && (
          <Posts
            users={users}
            votes={votes}
            search={search}
            subreddit={subreddit.name}
            subreddit_id={subreddit.id}
            deletePost={deletePost}
            posts={posts}
            currentUser={currentUser}
            subreddits={subreddits}
          />
        )}
      </Container>
    </section>
  )
}

Subreddit.propTypes = {
  fetchSubredditPosts: PropTypes.func.isRequired,
  fetchSubreddits: PropTypes.func.isRequired,
  fetchSubreddit: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchVotes: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  deleteSubreddit: PropTypes.func.isRequired,
  subreddits: PropTypes.object,
  posts: PropTypes.object,
};

const mapStateToProps = state => ({
  subreddits: state.subreddits,
  posts: state.posts,
  users: state.users,
  votes: state.votes,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  {
    deletePost,
    deleteSubreddit,
    fetchUsers,
    fetchVotes,
    fetchSubredditPosts,
    fetchSubreddits,
    fetchSubreddit
  }
)(Subreddit);