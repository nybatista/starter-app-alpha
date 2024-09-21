import {ViewStream} from 'spyne';

export class AppView extends ViewStream {

  constructor(props = {}) {
    props.tagName='main';
    props.id='app-main';
    props.class='main';
    super(props);
  }

  addActionListeners() {
    return [];
  }


  broadcastEvents() {
    return [];
  }

  addHelloWorld(){
    const helloWorldView = new ViewStream({
      data: {
        msg: "Hello World",
        img: "imgs/noun-robot.png"
      },
      template: require('./hello-world.tmpl.html')
    })

    this.appendView(helloWorldView);

    console.log("IMG PATH ",IMG_PATH);
  }

  onRendered() {
    this.addHelloWorld();
  }

}
