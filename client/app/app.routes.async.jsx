import React from 'react';
import Bundle from '../components/bundle/bundle';

export const HomeView = () => (<Bundle name="HomeView" load={import('./home/home.view')} />);
export const AboutView = () => (<Bundle name="AboutView" load={import('./about/about.view')} />);
export const TodoView = () => (<Bundle name="TodoView" load={import('./todo/todo.view')} />);
