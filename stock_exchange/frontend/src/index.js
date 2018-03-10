import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from "./app/Routes";
import {HashRouter as Router} from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Router>
    <Routes/>
  </Router>, document.getElementById('root'));
registerServiceWorker();
