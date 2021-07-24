import React, { useEffect, } from 'react';
import { Route, Switch, } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { checkUserSession } from './redux/User/user.actions';

// components
import AdminToolbar from './components/AdminToolbar';

// styles
import './default.scss'

// hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth'

// layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';
import DashBoardLayout from "./layouts/DashBoardLayout";
import AdminLayout from "./layouts/AdminLayout";

// pages
import Homepage from './pages/Homepage'
import Search from './pages/Search';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import ProductDetails from './pages/ProductDetails';
import Cart from "./pages/Cart";
import Payment from './pages/Payment';
import Order from './pages/Order';

// MIXPANEL import and initalisation
import mixpanel from 'mixpanel-browser';
mixpanel.init('eeb84ce4d3b8542c1fdb063fa4fcfda4');



function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);


  return (
    <div className="App">
      <AdminToolbar />
      <Switch>
        <Route exact path='/' render={() => (
          <HomepageLayout >
            <Homepage />
          </HomepageLayout>
        )} />

        <Route exact path="/search" render={() => (
          <MainLayout>
            <Search />
          </MainLayout>
        )}></Route>

        <Route path="/search/:filterType" render={() => (
          <MainLayout>
            <Search />
          </MainLayout>
        )}></Route>

        <Route path="/product/:productID" render={() => (
          <MainLayout>
            <ProductDetails />
          </MainLayout>
        )}></Route>

        <Route path="/cart" render={() => (
          <WithAuth>
            <MainLayout>
              <Cart />
            </MainLayout>
          </WithAuth>
        )} />

        <Route path="/payment" render={() => (
          <WithAuth>
            <MainLayout>
              <Payment />
            </MainLayout>
          </WithAuth>
        )} />

        <Route path='/registration'
          render={() => (
            <MainLayout >
              <Registration />
            </MainLayout>
          )} />

        <Route path='/login'
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />

        <Route path='/recovery' render={() => (
          <MainLayout>
            <Recovery />
          </MainLayout>
        )} />

        <Route path='/dashboard' render={() => (
          <WithAuth>
            <DashBoardLayout>
              <Dashboard />
            </DashBoardLayout>
          </WithAuth>
        )} />

        <Route path='/orders/:orderID' render={() => (
          <WithAuth>
            <DashBoardLayout>
              <Order />
            </DashBoardLayout>
          </WithAuth>
        )} />

        <Route path='/admin' render={() => (
          <WithAdminAuth>
            <AdminLayout>
              <Admin />
            </AdminLayout>
          </WithAdminAuth>
        )} />
      </Switch>
    </div>
  );
}

export default App;
