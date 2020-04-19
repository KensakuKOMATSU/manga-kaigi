// @flow

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import AppHeader from './components/app-header'
import Home from './containers/home'
import Generate from './containers/generate'
import Channel from './containers/channels'


import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <AppHeader />
      </header>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/channels" component={Generate} exact />
          <Route path="/channels/:channelId" component={Channel} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
