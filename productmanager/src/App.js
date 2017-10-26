import { AppContainer } from 'react-hot-loader';
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import * as RoutesModule from './Routes';
import 'bootstrap';
import './style/site.css'
let routes = RoutesModule.routes;

class App extends Component {
  render() {
    let baseUrl = '/';
    return (
      <AppContainer>
            <BrowserRouter children={ routes } basename={ baseUrl } />
      </AppContainer>
    );
  }
}
export default App;
