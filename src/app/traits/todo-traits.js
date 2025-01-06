import { SpyneTrait } from 'spyne';

export class TodoTraits extends SpyneTrait {
  constructor(context) {
    // "todos$" prefix ensures consistent naming for trait methods
    let traitPrefix = 'todos$';
    super(context, traitPrefix);
  }

  static todos$StartEditMode() {
    // Toggle .is-editing class on the root .todo-item element
    this.props.el$.toggle('is-editing', true);

    // Initialize the edit input text
    this.props.el$('.edit-input').el.value = this.props.data.text;
  }

  static todos$EndEditMode() {
    this.props.el$.toggle('is-editing', false);

    // If we have new text, update the data
    const newVal = this.props.el$('.edit-input').el.value.trim();
    if (newVal) {
      this.props.data.text = newVal;
      this.props.el$('.todo-text').el.innerText = newVal;
    }
  }

  static todos$RemoveItem() {
    this.disposeViewStream();
  }
}
