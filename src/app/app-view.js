import { ViewStream } from 'spyne';
import { HelloWorld } from 'components/hello-world.js';

export class AppView extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'main';
    props.id = 'app';
    props.class = 'hello-world';
    props.channels = ['CHANNEL_ROUTE'];
    super(props);
  }

  addActionListeners() {
    return [['CHANNEL_ROUTE_DEEPLINK_EVENT', 'onRoute']];
  }

  onRoute(e) {
    const { payload } = e;
    const { linksData } = payload;
    console.log('payload ', { linksData, payload, e }, e.payload.linksData);
  }

  broadcastEvents() {
    return [];
  }

  onRendered() {
    this.appendView(new HelloWorld());
  }
}
