import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, withRouter, Router, } from 'react-router-dom';
import Header from './components/header/Header';
import Detail from './pages/detail/Detail';
import Home from './pages/home/Home';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/movie-detail/:id" exact component={Detail} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
