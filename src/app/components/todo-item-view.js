import { ViewStream, ChannelPayloadFilter } from 'spyne';
import { TodoTraits } from 'traits/todo-traits.js';
import TodoItemTmpl from './templates/todo-item.tmpl.html';

export class TodoItemView extends ViewStream {
  constructor(props = {}) {
    props.channels = ['CHANNEL_UI'];
    props.class = 'todo-item';
    props.traits = [TodoTraits];
    props.template = TodoItemTmpl;
    super(props);
  }

  broadcastEvents() {
    // Broadcast all button clicks
    return [['button', 'click']];
  }

  addActionListeners() {
    // Filter so only events with the correct todoId reach onItemEvent
    const todoFilter = new ChannelPayloadFilter({
      todoId: this.props.data.todoId,
    });
    return [['CHANNEL_UI_CLICK_EVENT', 'onItemEvent', todoFilter]];
  }

  onItemEvent(e) {
    const { action } = e.payload;
    const actionsFnLookup = {
      edit: this.todos$StartEditMode,
      remove: this.todos$RemoveItem,
      endEdit: this.todos$EndEditMode,
    };
    const fn = actionsFnLookup[action];
    if (fn) fn.call(this);
  }
}
