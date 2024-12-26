import './scss/main.scss';


// in your consumer
import  {SpyneApp} from 'spyne';

//import {SpyneApp} from 'spyne';
//import  {SpyneApp} from 'spyne/lib/spyne.umd.js';
//import  {SpyneApp} from 'spyne/src/spyne/spyne.js';
import { AppView } from './app/app-view.js';


//const {SpyneApp} = spyne;

const config = {
  debug: true,
  strict: false
};

SpyneApp.init(config);
console.log("SPYNEAPP ",SpyneApp);

new AppView().prependToDom(document.body);

/*

//import { SpyneApp } from 'spyne';
import { SpyneApp } from 'spyne/lib/spyne.umd.js';
import { AppView } from './app/app-view.js';
import { SpynePluginConsole } from 'spyne-plugin-console';

const config = {
  debug: true,
};

SpyneApp.init(config);

if (process.env.NODE_ENV === 'development') {
  //const { SpynePluginConsole } = require('spyne-plugin-console');
  new SpynePluginConsole({ position: ['bottom', 'right'], minimize: true });
}

new AppView().prependToDom(document.body);

*/
