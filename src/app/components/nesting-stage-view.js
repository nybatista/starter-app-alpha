import { ViewStream } from 'spyne';
import { NestingTraits } from 'traits/nesting-traits.js';

export class NestingStage extends ViewStream {
  constructor(props = {}) {
    props.id = 'nesting-example';
    props.vsid = 'reset';
    props.traits = [NestingTraits];
    props.childTypeArr = ['child', 'grandchild', 'ggc', 'ggc2', 'ggc3'];
    props.addRandom = true;
    props.template = `
         <button class="btn material-symbols-outlined reset" data-reset="true" data-add-random="false" data-child-type="reset"  data-event-type="reset">restart_alt</button>`;
    super(props);
  }

  addActionListeners() {
    return [['CHANNEL_UI_CLICK_EVENT', 'codePlayground$AddRootNode', '.reset']];
  }

  broadcastEvents() {
    return [['.reset', 'click']];
  }

  onRendered() {
    this.codePlayground$AddRootNode();
    this.addChannel('CHANNEL_UI');
  }
}
