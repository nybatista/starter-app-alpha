import { ViewStream } from 'spyne';
import { MemeGeneratorTraits } from 'traits/meme-generator-traits.js';

/**
 * This class defines the root DOM element
 * (in this case a <main> with id="meme"),
 * loads MemeGeneratorTraits and
 * listens for meme-related updates.
 */
export class AppView extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'main';
    props.id = 'meme';
    props.traits = [MemeGeneratorTraits]; // Import the MemeGenerator trait methods
    props.channels = ['CHANNEL_MEME_GENERATOR']; // Listen for meme generator events
    super(props);
  }

  /**
   * Returns an array of mappings from channel actions to local Trait methods.
   * In this example, whenever 'CHANNEL_MEME_GENERATOR_UPDATE_EVENT' is emitted,
   * we call 'memeGenerator$CreateMemeFromTxtAndImg' to build and insert the meme.
   */
  addActionListeners() {
    return [
      [
        'CHANNEL_MEME_GENERATOR_UPDATE_EVENT',
        'memeGenerator$CreateMemeFromTxtAndImg',
      ],
    ];
  }

  /**
   * Optionally list DOM events you want to broadcast to channels.
   * Currently empty, but you might add click or input events here
   * if the user triggers meme generation via UI interactions.
   */
  broadcastEvents() {
    return [];
  }

  /**
   * Uncomment the below test call if you want to see a test meme
   * immediately on load, bypassing channel fetches:
   *
   */
  onRendered() {
    // this.memeGenerator$Test();
  }
}
