//main SCSS file for styling
import './scss/main.scss';

// SpyneJS core imports
import { SpyneApp } from 'spyne';

// Your main AppView
import { AppView } from './app/app-view.js';

// Basic SpyneApp config object
const config = {
  debug: true,
};

// Initialize the Spyne application
SpyneApp.init(config);

// Conditionally load additional dev tools
if (process.env.NODE_ENV === 'development') {
  import('./dev-tools.js');
}

// Create an instance of the main AppView and attach it to the body tag
new AppView().appendToDom(document.body);
