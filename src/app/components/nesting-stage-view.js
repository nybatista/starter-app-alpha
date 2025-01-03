import { ViewStream } from 'spyne';
import { NestingTraits } from 'traits/nesting-traits.js';

export class NestingStage extends ViewStream {
  constructor(props = {}) {
    props.id = 'nesting-example';
    props.vsid = 'reset';
    props.traits = [NestingTraits];
    props.childTypeArr = [
      'galaxy',
      'solar-system',
      'planet',
      'moon',
      'asteroid',
    ];
    props.addRandom = true;
    props.template = `
         <button class="btn material-symbols-outlined reset" data-reset="true" data-add-random="false" data-child-type="reset"  data-event-type="reset">restart_alt</button>`;
    super(props);
  }

  addActionListeners() {
    return [
      ['CHANNEL_UI_CLICK_EVENT', 'nestPlayground$AdduniverseNode', '.reset'],
    ];
  }

  broadcastEvents() {
    return [['.reset', 'click']];
  }

  onRendered() {
    this.nestPlayground$AdduniverseNode();
    this.addChannel('CHANNEL_UI');
  }
}
