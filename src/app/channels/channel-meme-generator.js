import { Channel } from 'spyne';
import { MemeGeneratorTraits } from 'traits/meme-generator-traits.js';

export class ChannelMemeGenerator extends Channel {
  constructor(name, props = {}) {
    name = 'CHANNEL_MEME_GENERATOR';
    props.sendCachedPayload = false;

    // Attach MemeGeneratorTraits so we can call memeGenerator$ methods in this channel
    props.traits = [MemeGeneratorTraits];

    super(name, props);
  }

  /**
   * Called when SpyneApp registers this channel.
   * Fetches text/image data via memeGenerator$GetTxtAndImg.
   */
  onRegistered() {
    this.memeGenerator$GetTxtAndImg();
  }

  /**
   * Declare actions this channel can broadcast or handle.
   */
  addRegisteredActions() {
    return ['CHANNEL_MEME_GENERATOR_UPDATE_EVENT'];
  }

  /**
   * (Optional) Called when this channel receives or updates view stream info.
   */
  onViewStreamInfo() {}
}
