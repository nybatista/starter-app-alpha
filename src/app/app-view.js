import { ViewStream } from 'spyne';
import { TodoListView } from 'components/todo-list-view.js';

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
    this.appendView(new TodoListView(), '#examples');
  }
}
