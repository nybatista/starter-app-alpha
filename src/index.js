import './scss/main.scss';
import { SpyneApp, ChannelFetch } from 'spyne';
import { AppView } from './app/app-view.js';
import { ChannelMemeGenerator } from 'channels/channel-meme-generator.js';

const config = {
  debug: true,
};

SpyneApp.init(config);
SpyneApp.registerChannel(new ChannelMemeGenerator());

const imgUrl = 'https://dog.ceo/api/breeds/image/random';
const txtUrl = '//api.quotable.io/random';

SpyneApp.registerChannel(
  new ChannelFetch('CHANNEL_MEME_IMG', {
    url: imgUrl,
  }),
);

SpyneApp.registerChannel(
  new ChannelFetch('CHANNEL_MEME_TXT', {
    url: txtUrl,
  }),
);

if (process.env.NODE_ENV === 'development') {
  import('./dev-tools.js');
}

new AppView().appendToDom(document.querySelector('body'));
