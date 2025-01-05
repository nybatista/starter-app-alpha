import { ViewStream } from 'spyne';
import { TodoItemView } from './todo-item-view.js';

export class TodoListView extends ViewStream {
  constructor(props = {}) {
    // The parent might keep track of a simple ID counter, or a data array
    props.channels = ['CHANNEL_UI'];
    props.id = 'todo-app';
    props.template = `
       <h1>todos</h1>
<div class="todo-header">
  <input
    type="text"
    class="new-todo"
    placeholder="What needs to be done?"
  />
  <button
    class="add-todo"
    data-action="add"
  >
    Add Todo
  </button>

  <div class="items"></div>
</div>
    `;
    super(props);
    this.nextId = 1;
    this.todos = [];
  }

  broadcastEvents() {
    // The "Add Todo" button
    return [['.add-todo', 'click']];
  }

  // We want to respond to an "add" action from the same channel,
  // but we can handle that directly or via a ChannelPayloadFilter.
  addActionListeners() {
    return [['CHANNEL_UI_CLICK_EVENT', 'onAddTodo']];
  }

  onAddTodo(e) {
    const { action } = e.payload;
    if (action !== 'add') return;
    // Grab the input text
    const inputEl = this.props.el$('.new-todo').el;
    const text = inputEl.value.trim();
    if (!text) return;

    // Create a new item object
    const newItem = { todoId: `todo-${this.nextId++}`, text, completed: false };
    this.todos.push(newItem);
    // Append a new TodoItemView
    this.appendView(new TodoItemView({ data: newItem }), '.items');

    // Clear the input
    inputEl.value = '';
  }
}
