import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import allTrain from './allTrain';
import singleTrain from './singleTrain';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={allTrain} />
        <Route path="/trains/:trainId" component={singleTrain} />
      </Switch>
    </Router>
  );
};

export default App;
