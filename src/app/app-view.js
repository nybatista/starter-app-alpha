import { ViewStream } from 'spyne';
import { NestingStage } from 'components/nesting-stage-view.js';

/**
 * This class defines the universe DOM element
 * (in this case a <main> with id="meme"),
 * loads MemeGeneratorTraits and
 * listens for meme-related updates.
 */
export class AppView extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'main';
    props.id = 'meme';
    props.traits = []; // Import the MemeGenerator trait methods
    props.channels = []; // Listen for meme generator events
    super(props);
  }

  /**
   * Returns an array of mappings from channel actions to local Trait methods.
   * In this example, whenever 'CHANNEL_MEME_GENERATOR_UPDATE_EVENT' is emitted,
   * we call 'memeGenerator$CreateMemeFromTxtAndImg' to build and insert the meme.
   */
  addActionListeners() {
    return [];
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
    this.appendView(new NestingStage());
  }
}
