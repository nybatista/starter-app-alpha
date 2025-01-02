import { ViewStream } from 'spyne';
export class PageView extends ViewStream {
  constructor(props = {}) {
    props.class = `page-view page-view-${props.data.pageId}`;
    props.channels = [['CHANNEL_ROUTE', true]];
    props.template = `    <div class="page-content">
                            <h2>{{title}}</h2>
                             <p>{{text}}</p>
                          </div>
                                    `;
    super(props);
  }

  addActionListeners() {
    return [['CHANNEL_ROUTE_CHANGE_EVENT', 'disposeViewStream']];
  }
}
