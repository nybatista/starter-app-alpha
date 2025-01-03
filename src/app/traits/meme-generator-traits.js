import { SpyneTrait } from 'spyne';
import { MemeElement } from 'components/meme-element.js';

/**
 * MemeGeneratorTraits demonstrates how to:
 * 1) Merge data from two channels (images and text) into a single payload.
 * 2) Send that combined data to the UI via a SpyneJS channel event.
 * 3) Optionally generate a meme element in the DOM for preview or final display.
 */
export class MemeGeneratorTraits extends SpyneTrait {
  /**
   * The constructor for a Trait. Here, "traitPrefix" enforces consistent naming
   * (e.g., "memeGenerator$MethodName") within this trait. If a developer
   * accidentally defines a method without the prefix, SpyneJS logs a warning.
   *
   * The "$" suffix is a common SpyneJS convention to highlight that these
   * methods are from a Trait (often dealing with channel logic).
   */
  constructor(context) {
    let traitPrefix = 'memeGenerator$';
    super(context, traitPrefix);
  }

  /**
   * 1) Merges the next emission from 'CHANNEL_MEME_IMG' and 'CHANNEL_MEME_TXT'.
   * 2) Subscribes once both channels have data, then calls 'memeGenerator$OnTxtAndImgReturned'.
   */
  static memeGenerator$GetTxtAndImg() {
    // 'mergeChannels' merges the next emissions from each channel into one result.
    this.mergeChannels(['CHANNEL_MEME_IMG', 'CHANNEL_MEME_TXT']).subscribe(
      this.memeGenerator$OnTxtAndImgReturned.bind(this),
    );
  }

  /**
   * Called after both channels have emitted. Extracts relevant data from each
   * channel's payload, then sends out a new event 'CHANNEL_MEME_GENERATOR_UPDATE_EVENT'
   * so another ViewStream or Channel can use the combined data.
   *
   * @param {Object} e - The merged channels object, for example:
   *  {
   *    "CHANNEL_MEME_IMG": { payload: { message, title } },
   *    "CHANNEL_MEME_TXT": { payload: { content, author } }
   *  }
   */
  static memeGenerator$OnTxtAndImgReturned(e) {
    // Extract the random image data; fallback title if none is provided.
    const { message, title = 'random doggo' } = e['CHANNEL_MEME_IMG'].payload;

    // Extract text content (content + author) from the text channel.
    const { content, author } = e['CHANNEL_MEME_TXT'].payload;

    // Broadcast a new payload so the rest of the system (UI, logs, etc.) knows
    // we've got a complete meme set (image + text).
    this.sendChannelPayload('CHANNEL_MEME_GENERATOR_UPDATE_EVENT', {
      message,
      title,
      content,
      author,
    });
  }

  /**
   * Uses the data from the event payload to create a MemeElement and append it
   * to the DOM (this.props.el is the universe element for the ViewStream instance
   * that imported these methods, and uses appendChild to load the MemeElement content).
   *
   * @param {Object} e - Contains { payload: {...} } with { message, title, content, author }.
   */
  static memeGenerator$CreateMemeFromTxtAndImg(e) {
    const data = e.payload;
    const memeHTML = new MemeElement({ data });
    // props.el is the universe element for the ViewStream instance that imported these Trait methods,
    // so we can append our MemeElement directly to it.
    this.props.el.appendChild(memeHTML.render());
  }

  /**
   * A quick test method that bypasses channel data and uses local dummy data
   * to create a meme. Useful in dev or offline scenarios.
   */
  static memeGenerator$Test() {
    // Grab some dummy data for a meme
    const payload = this.memeGenerator$TestData();
    // Pass that payload to the creation logic, simulating a channel event.
    this.memeGenerator$CreateMemeFromTxtAndImg({ payload });
  }

  /**
   * Returns a fixed object for testing. Replace or expand as needed.
   */
  static memeGenerator$TestData() {
    return {
      message:
        'https://images.dog.ceo/breeds/terrier-norfolk/n02094114_2625.jpg',
      title: 'random doggo',
      content: "Don't wait. The time will never be just right.",
      author: 'Napoleon Hill',
    };
  }
}
