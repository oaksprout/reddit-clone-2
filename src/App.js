/*

TODOS:
= Consistent margins and paddings
= Comments throughout app
= Reorganize components (!!!)
= Clean up PostForm / UpdatePostForm
= Include signup by email / password
= Rename Reggit

*/

import React, { useEffect } from 'react';
import './App.scss';
// import 'bulma/css/bulma.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import firebase from './firebase';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/routing/PrivateRoute';

import Index from './components/homepage/Index';
import Subreddit from './components/subreddit/Subreddit';
import Post from './components/post/Post';
import User from './components/user/User';
import Subreddits from './components/subreddits/Subreddits';
import CreateSubreddit from './components/createSubreddit/CreateSubreddit';

import store from './store';
import { getUser, userError } from './actions/auth';

function App() {
  // check if a user is logged in throughout
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      // if a user exists, update the store with user information
      if (user) {
        let setUser = {
          name: user.displayName,
          id: user.uid,
          image: user.photoURL
        }
        store.dispatch(getUser(setUser));
      } else {
        store.dispatch(userError());
      }
    });
  });
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Header />
            <Switch>
              <Redirect exact from='/' to='/r/offerings' component={Index} />
              <PrivateRoute exact path='/create-a-subreddit' component={CreateSubreddit} />
              <Route exact path='/r/index' component={Subreddits} />
              <Route exact path ='/r/:name' component={Subreddit} />
              <Route exact path='/r/:name/:post_id' component={Post} />
              <Route exact path='/u/:user_id' component={User} />
            </Switch>
          </div>
        </div>
        <Footer />
    </Router>
  );
}

export default App;
