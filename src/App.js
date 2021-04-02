import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import NotFound from './components/NotFound/NotFound' ;

const Photo = React.lazy(() => import('./features/Photo/Photo'));
//remember have Suspense when using React lazy

function App() {
  return (
    <div className="photo-app">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Header/>

          <Switch>
            <Redirect exact from="/" to="/photos" />

            <Route path="/photos" component={Photo} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense> 
    </div>
  );
}

export default App;

