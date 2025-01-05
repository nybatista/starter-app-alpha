import { SpyneTrait } from 'spyne';

export class TodoTraits extends SpyneTrait {
  constructor(context) {
    // "todos$" enforces consistent naming for trait methods
    let traitPrefix = 'todos$';
    super(context, traitPrefix);
  }

  /**
   * Switch from display to edit mode:
   *  - Show an <input> with the current text
   *  - Possibly hide the normal <p> text
   */
  static todos$StartEditMode() {
    this.state.editing = true;
    // Show input, hide .todo-text
    this.props.el$('.todo-text').el.style.display = 'none';
    this.props.el$('.edit-input').el.style.display = 'inline-block';
    this.props.el$('.edit-input').el.value = this.props.data.text;
    this.props.el$('.end-edit').el.style.display = 'inline-block';
  }

  /**
   * End edit mode:
   *  - Capture input text and update the item’s data
   *  - Revert the UI to display mode
   */
  static todos$EndEditMode() {
    this.state.editing = false;
    const newVal = this.props.el$('.edit-input').el.value.trim();
    if (newVal) {
      this.props.data.text = newVal;
      this.props.el$('.todo-text').el.innerText = newVal;
    }
    // Hide input, show .todo-text
    this.props.el$('.todo-text').el.style.display = 'inline-block';
    this.props.el$('.edit-input').el.style.display = 'none';
    this.props.el$('.end-edit').el.style.display = 'none';
  }

  /**
   * Dispose the current Todo item
   */
  static todos$RemoveItem() {
    this.disposeViewStream();
  }
}
