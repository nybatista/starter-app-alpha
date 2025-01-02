import { ViewStream } from 'spyne';
import { MemeGeneratorTraits } from 'traits/meme-generator-traits.js';

export class AppView extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'main';
    props.id = 'meme';
    props.traits = [MemeGeneratorTraits];
    props.channels = ['CHANNEL_MEME_GENERATOR'];
    super(props);
  }

  addActionListeners() {
    return [
      ['CHANNEL_MEME_GENERATOR_UPDATE_EVENT', 'memeGenerator$CreateMeme'],
    ];
  }

  broadcastEvents() {
    return [];
  }

  onRendered() {
    //this.memeGenerator$Test();
  }
}
