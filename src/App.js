import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

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

function App() {

  const [currentUser, setCurrentUser] = useState();

  
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
          <HomepageLayout currentUser={currentUser}>
            <Homepage/>
          </HomepageLayout>
        )} />
        <Route path='/registration' 
        render={() => currentUser ? <Redirect to='/' /> : (
          <MainLayout currentUser={currentUser}>
            <Registration />
          </MainLayout>
        )} />
        <Route path='/login'
          render={() => currentUser ? <Redirect to='/' /> : (
            <MainLayout currentUser={currentUser}>
              <Login />
            </MainLayout>
          )} />
      </Switch>
    </div>
  );
}

export default App;
