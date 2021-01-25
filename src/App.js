import React , { useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import './default.scss'

// components
import Header from './components/Header';

// layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// pages
import Homepage from './pages/Homepage'
import Registration from './pages/Registration';

function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={() => (
          <HomepageLayout>
            <Homepage/>
          </HomepageLayout>
        )} />
        <Route path='/registration' render={() => (
          <MainLayout>
            <Registration />
          </MainLayout>
        )} />
      </Switch>
    </div>
  );
}

export default App;
