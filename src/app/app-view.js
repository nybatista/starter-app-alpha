import { ViewStream } from 'spyne';
import { PageTraits } from 'traits/page-traits.js';
import StaticTmplHTML from 'components/templates/static-example.tmpl.html';

export class AppView extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'main';
    props.id = 'app';
    props.template = StaticTmplHTML;
    props.traits = [PageTraits];
    props.channels = ['CHANNEL_ROUTE'];
    super(props);
  }

  addActionListeners() {
    return [['CHANNEL_ROUTE_.*_EVENT', 'pageTraits$onRouteEvent']];
  }

  broadcastEvents() {
    return [['nav a', 'click']];
  }

  addBasicHelloWorld() {
    this.appendView(new ViewStream({ data: 'Hello World' }), '#examples');
  }

  onRendered() {
    // this.appendView(new HelloWorldView(), '#examples');
  }
}
