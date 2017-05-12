import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './socket.service';
import { HomeView, AboutView, TodoView } from './app.routes.async';
import Link from './navigation/link';

const AppLayout = () => (
  <div className="is-loading">
    <header>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/todo">Todo</Link></li>
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
