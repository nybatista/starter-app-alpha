import './scss/main.scss';
import { SpyneApp } from 'spyne';
import { AppView } from './app/app-view.js';

const config = {
  debug: true,
  strict: true,
};

SpyneApp.init(config);

if (process.env.NODE_ENV === 'development') {
  import('spyne-plugin-console').then(({ SpynePluginConsole }) => {
    SpyneApp.registerPlugin(
      new SpynePluginConsole({
        position: ['bottom', 'right'],
        minimize: false,
      }),
    );
  });
}

new AppView().prependToDom(document.querySelector('body'));
