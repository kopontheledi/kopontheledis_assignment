// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './public/App';
import ContactForm from './components/contactForm'; 
import ContactList from './components/clientList';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/contact-form" component={ContactForm} />
      <Route path="/contact-summary" component={ContactList} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
