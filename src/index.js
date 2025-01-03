//main SCSS file for styling
import './scss/main.scss';

// SpyneJS core imports
import { SpyneApp, ChannelFetch } from 'spyne';

// Your main AppView
import { AppView } from './app/app-view.js';

// A custom channel that combines data from other channels
import { ChannelMemeGenerator } from 'channels/channel-meme-generator.js';

// Basic SpyneApp config object
const config = {
  debug: true,
};

// Initialize the Spyne application
SpyneApp.init(config);

// Register the ChannelMemeGenerator channel
SpyneApp.registerChannel(new ChannelMemeGenerator());

// Define API endpoints
const imgUrl = 'https://dog.ceo/api/breeds/image/random';
const txtUrl = '//api.quotable.io/random';

// Register a ChannelFetch for "CHANNEL_MEME_IMG"
SpyneApp.registerChannel(
  new ChannelFetch('CHANNEL_MEME_IMG', {
    url: imgUrl,
  }),
);

// Register a ChannelFetch for "CHANNEL_MEME_TXT"
SpyneApp.registerChannel(
  new ChannelFetch('CHANNEL_MEME_TXT', {
    url: txtUrl,
  }),
);

// Conditionally load additional dev tools
if (process.env.NODE_ENV === 'development') {
  import('./dev-tools.js');
}

// Create an instance of the main AppView and attach it to the body tag
new AppView().appendToDom(document.body);
