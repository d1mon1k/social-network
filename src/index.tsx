import React from 'react';
import { createRoot } from 'react-dom/client';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import { store } from './redux/store';
import './sassStyles/global.scss';
import './sassStyles/typography.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const container = document.getElementById('root');
const root = createRoot(container!);
const baseColor = getComputedStyle(document.documentElement).getPropertyValue('--skeleton-base-color');
const highlightColor = getComputedStyle(document.documentElement).getPropertyValue('--skeleton-highlight-color');

root.render(
  <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </SkeletonTheme>
);
