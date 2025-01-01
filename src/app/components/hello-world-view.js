import { ViewStream } from 'spyne';
import { HelloWorldTrait } from 'traits/hello-world-trait.js';

export class HelloWorldView extends ViewStream {
  constructor(props = {}) {
    // Minimal HTML: a title + a button
    props.template = `<h2></h2><button id="hw-vbl">Click Me</button>`;
    props.traits = [HelloWorldTrait];
    props.channels = ['CHANNEL_UI'];
    super(props);
  }

  // Map click events to the greet method
  addActionListeners() {
    return [['CHANNEL_UI_CLICK_EVENT', 'helloWorld$Greet']];
  }

  // Tell the UI channel to watch for button clicks
  broadcastEvents() {
    return [['button', 'click']];
  }

  onRendered() {
    this.helloWorld$Greet();
  }
}
