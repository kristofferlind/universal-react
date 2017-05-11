import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import './socket.service';
import { HomeView, AboutView, TodoView } from './app.routes.async';

const AppLayout = () => (
  <div className="is-loading">
    <header>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/todo">Todo</NavLink></li>
      </ul>
    </header>
    <main>
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/about" component={AboutView} />
        <Route path="/todo" component={TodoView} />
      </Switch>
    </main>
  </div>
);

export default AppLayout;
