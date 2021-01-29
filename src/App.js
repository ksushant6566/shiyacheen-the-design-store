import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { setCurrentUser } from './redux/User/user.actions';

// styles
import './default.scss'

// utils
import { auth, handleUserProfile } from './firebase/utils'

// components

// layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// pages
import Homepage from './pages/Homepage'
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';


function App(props) {
  const { currentUser, setCurrentUser } = props;

  useEffect(() => {
    let authListner = auth.onAuthStateChanged( async userAuth => {
      if(userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          })
        })
      }
      else {
        setCurrentUser(null);
      }
    })

    return (() => { authListner() });
  }, []);


  return (
    <div className="App">
      <Switch>

        <Route exact path='/' render={() => (
          <HomepageLayout >
            <Homepage/>
          </HomepageLayout>
        )} />

        <Route path='/registration' 
        render={() => currentUser ? <Redirect to='/' /> : (
          <MainLayout >
            <Registration />
          </MainLayout>
        )} />

        <Route path='/login'
          render={() => currentUser ? <Redirect to='/' /> : (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />

          <Route path='/recovery' render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )} />
      </Switch>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
