import { ViewStream, ChannelPayloadFilter } from 'spyne';
import { TodoItemView } from './todo-item-view.js';

export class TodoListView extends ViewStream {
  constructor(props = {}) {
    props.channels = ['CHANNEL_UI'];
    props.id = 'todo-app';
    props.nextTodoId = 1;
    props.template = `
        <h1>todos</h1>
        <div class="todo-header">
          <input
            type="text"
            class="new-todo"
            placeholder="What needs to be done?" />
          <button
            class="add-todo"
            data-action="add">
            Add Todo
          </button>
          <div class="items"></div>
        </div>`;
    super(props);
  }

  broadcastEvents() {
    // The "Add Todo" button
    return [['.add-todo', 'click']];
  }

  // We want to respond to an "add" action from the same channel,
  addActionListeners() {
    const addActionFilter = new ChannelPayloadFilter({ action: 'add' });
    return [['CHANNEL_UI_CLICK_EVENT', 'onAddTodo', addActionFilter]];
  }

  onAddTodo() {
    // Grab the input text
    const inputEl = this.props.el$('.new-todo').el;
    const text = inputEl.value.trim();
    if (!text) return;

    // Create a new item object
    const newItem = {
      todoId: `todo-${this.props.nextTodoId++}`,
      text,
      completed: false,
    };

    // Append a new TodoItemView
    this.appendView(new TodoItemView({ data: newItem }), '.items');

    // Clear the input
    inputEl.value = '';
  }
}
