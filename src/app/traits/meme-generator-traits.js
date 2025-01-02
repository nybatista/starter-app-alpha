import { DomElement, SpyneTrait } from 'spyne';
import { MemeElement } from 'components/meme-element.js';

export class MemeGeneratorTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'memeGenerator$';
    super(context, traitPrefix);
  }

  static memeGenerator$OnDataReturned(e) {
    console.log('E IS ', e);
    const { message, title = 'random doggo' } = e['CHANNEL_MEME_IMG'].payload;
    const { content, author } = e['CHANNEL_MEME_TXT'].payload;
    this.sendChannelPayload('CHANNEL_MEME_GENERATOR_UPDATE_EVENT', {
      message,
      title,
      content,
      author,
    });
  }

  static memeGenerator$GetFetchChannels() {
    this.mergeChannels(['CHANNEL_MEME_IMG', 'CHANNEL_MEME_TXT']).subscribe(
      this.memeGenerator$OnDataReturned.bind(this),
    );
  }

  static memeGenerator$CreateMeme(e) {
    const data = e.payload;

    console.log('DATA IS ', data);
    const mashupHTML = new MemeElement({ data });
    this.props.el.appendChild(mashupHTML.render());
  }

  static memeGenerator$HelloWorld() {
    return 'Hello World';
  }

  static memeGenerator$Test() {
    const payload = this.memeGenerator$TestData();
    this.memeGenerator$CreateMeme({ payload });
  }

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
