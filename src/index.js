import './scss/main.scss';
import { SpyneApp } from 'spyne';
import { AppView } from './app/app-view.js';
import { SpynePluginConsole } from 'spyne-plugin-console';


const config = {
  debug: true,
  strict: true,
};

SpyneApp.init(config);


if (process.env.NODE_ENV === 'development') {
  SpyneApp.registerPlugin(new SpynePluginConsole({ position: ['bottom', 'right'], minimize: true }));
}

new AppView().prependToDom(document.body);
