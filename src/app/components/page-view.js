import { ViewStream } from 'spyne';
import PageTmpl from './templates/page.tmpl.html';
export class PageView extends ViewStream {
  constructor(props = {}) {
    props.template = PageTmpl;
    props.channels = [['CHANNEL_ROUTE', true]];
    super(props);
  }

  addActionListeners() {
    // return nested array(s)
    return [['CHANNEL_ROUTE_CHANGE_EVENT', 'disposeViewStream']];
  }

  broadcastEvents() {
    // return nested array(s)
    return [];
  }

  onRendered() {}
}
