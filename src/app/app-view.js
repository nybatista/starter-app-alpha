import { ViewStream } from 'spyne';
import helloWorldTmpl from './hello-world.tmpl.html';

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
      style: 'background:orange',
      template: helloWorldTmpl,
    });

    this.appendView(helloWorldView);
  }

  onRendered() {
    this.addHelloWorld();
  }
}
