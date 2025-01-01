import { SpyneTrait } from 'spyne';

export class HelloWorldTrait extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'helloWorld$';

    super(context, traitPrefix);
  }

  static helloWorld$Greet() {
    // Initialize the greetings array once, storing it in props
    if (!this.props.greetings) {
      this.props.greetings = [
        'Hello World',
        'Hola Mundo',
        'Bonjour le monde',
        'Hallo Welt',
        'こんにちは世界',
        '你好，世界',
        '안녕하세요 월드',
        'Привіт, світе',
        'مرحبا بالعالم',
        'Olá Mundo',
        'Ciao Mondo',
      ];
    }

    // Remove the first item
    const currentGreeting = this.props.greetings.shift();

    // Update the UI
    this.props.el$('h2').el.innerText = currentGreeting;

    // Re-insert the item at the end to cycle
    this.props.greetings.push(currentGreeting);

    return currentGreeting;
  }
}
