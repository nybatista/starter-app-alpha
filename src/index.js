import './scss/main.scss';
import { SpyneApp } from 'spyne';
import { AppView } from './app/app-view.js';

const config = {
  debug: true,
};

SpyneApp.init(config);

if (process.env.NODE_ENV === 'development') {
  import('./dev-tools.js');
}

new AppView().appendToDom(document.querySelector('body'));
