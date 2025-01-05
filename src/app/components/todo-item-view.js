import { ViewStream, ChannelPayloadFilter } from 'spyne';
import { TodoTraits } from 'traits/todo-traits.js';
import TodoItemTmpl from './templates/todo-item.tmpl.html';

export class TodoItemView extends ViewStream {
  constructor(props = {}) {
    props.channels = ['CHANNEL_UI'];
    // Attach the TodoTraits so we can call todos$ methods
    props.traits = [TodoTraits];
    props.template = TodoItemTmpl;
    super(props);

    this.state = {
      editing: false,
    };
  }

  broadcastEvents() {
    // Each item’s edit / remove / end-edit button
    // will broadcast a click to the “TODO_CHANNEL”
    return [['button', 'click']];
  }

  addActionListeners() {
    // Only respond if payload.id matches this item’s id,
    // and action is one of "edit", "remove", or "endEdit"
    const todoFilter = new ChannelPayloadFilter({
      todoId: this.props.data.todoId,
    });

    return [['CHANNEL_UI_CLICK_EVENT', 'onItemEvent', todoFilter]];
  }

  onItemEvent(e) {
    const { action } = e.payload;
    if (action === 'edit') {
      this.todos$StartEditMode();
    } else if (action === 'remove') {
      this.todos$RemoveItem();
    } else if (action === 'endEdit') {
      this.todos$EndEditMode();
    }
  }
}
