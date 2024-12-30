import { ViewStream } from 'spyne';
import HelloWorldTmpl from './hello-world.tmpl.html';

export class AppView extends ViewStream {
  constructor(props = {}) {
    props.tagName = 'main';
    props.id = 'app-main';
    props.class = 'main';
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
