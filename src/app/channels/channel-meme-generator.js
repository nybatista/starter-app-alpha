import { Channel } from 'spyne';
import { MemeGeneratorTraits } from 'traits/meme-generator-traits.js';

export class ChannelMemeGenerator extends Channel {
  constructor(name, props = {}) {
    name = 'CHANNEL_MEME_GENERATOR';
    props.sendCachedPayload = false;
    props.traits = [MemeGeneratorTraits];
    super(name, props);
  }

  onRegistered() {
    this.memeGenerator$GetFetchChannels();
  }

  addRegisteredActions() {
    return ['CHANNEL_MEME_GENERATOR_UPDATE_EVENT'];
  }

  onViewStreamInfo() {}
}
