import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import EstoqueForm from './screens/estoque/EstoqueForm';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';



ReactDOM.render(
   <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={App} />
        <Route path="/EstoqueForm" component={EstoqueForm} />
      </Switch>
    </ BrowserRouter>
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();