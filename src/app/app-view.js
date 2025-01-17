import { ViewStream } from 'spyne';
import { HelloWorld } from 'components/hello-world.js';

export class AppView extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'main';
    props.id = 'app';
    super(props);
  }

  addActionListeners() {
    return [];
  }

  broadcastEvents() {
    return [];
  }

  onRendered() {
    this.appendView(new HelloWorld());
  }
}
