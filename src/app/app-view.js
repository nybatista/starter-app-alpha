import { ViewStream } from 'spyne';
import HelloWorldTmpl from 'components/templates/hello-world.tmpl.html';

export class AppView extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'main';
    props.id = 'app';
    super(props);
  }

  addActionListeners() {
    return [];
  }

  broadcastEvents() {
    return [];
  }

  addHelloWorld() {
    const helloWorldView = new ViewStream({
      id: 'hello-world',
      data: {
        msg: 'Hello World',
        img: 'imgs/noun-robot.png',
      },
      template: HelloWorldTmpl,
    });

    this.appendView(helloWorldView);
  }

  onRendered() {
    this.addHelloWorld();
  }
}
