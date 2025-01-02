import { ViewStream } from 'spyne';
import { HelloWorldView } from 'components/hello-world-view.js';

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

  onRendered() {
    this.appendView(new HelloWorldView(), '#examples');
  }
}
