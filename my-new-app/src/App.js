import './App.css';
import './components/PriceList';
import React, { Suspense, lazy, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { MyContext } from './MyContext';
import { getCurrentDate } from './utility';

const Home = lazy(() => import('./containers/Home'));
const Create = lazy(() => import('./containers/Create'));
const SignIn = lazy(() => import('./containers/SignIn'));
const cDate = getCurrentDate();

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      year: cDate.year,
      month: cDate.month
    }
  }
  render() {
    return (
      <MyContext.Provider value={{
        state: this.state,
        actions: this.actions
      }}>

        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={SignIn}/>
              <Route path="/create" component={Create} />
              <Route path="/edit/:id" component={Create} />
            </Switch>
          </Suspense>
        </Router>
      </MyContext.Provider>

    )
  }
}

export default App;
