import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContactList from './components/clientList';
import ContactForm from './components/contactForm';
import ContactSummary from './components/contactSummary';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ContactList} />
        <Route path="/contact-form" component={ContactForm} />
        <Route path="/contact-summary" component={ContactSummary} />
      </Switch>
    </Router>
  );
};

export default App;
