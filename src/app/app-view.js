import { ViewStream } from 'spyne';

export class AppView extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'main';
    props.id = 'app';
    props.template = `<div id='examples'></div>`;
    super(props);
  }

  addActionListeners() {
    return [];
  }

  broadcastEvents() {
    return [];
  }

  addBasicHelloWorld() {
    this.appendView(new ViewStream({ data: 'Hello World' }), '#examples');
  }

  onRendered() {
    this.addBasicHelloWorld();
  }
}
