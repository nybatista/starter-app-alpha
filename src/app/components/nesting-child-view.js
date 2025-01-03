import { ViewStream, ChannelPayloadFilter } from 'spyne';
import { NestingTraits } from 'traits/nesting-traits.js';
import NestingChildTmpl from './templates/nesting-child.tmpl.html';

export class NestingChildView extends ViewStream {
  constructor(props = {}) {
    props.traits = [NestingTraits];
    props.data ??= { childType: 'universe' };
    props.addRandom ??= false;
    props.childTypeArr ??= ['child', 'grandchild', 'ggc', 'ggc2', 'ggc3'];
    props.class = `branch ${props.data.childType}`;
    props.template = NestingChildTmpl;
    super(props);
  }

  addActionListeners() {
    const payloadFilter = new ChannelPayloadFilter({
      payload: (p) =>
        p.childType === this.props.data.childType || p.childType === 'reset',
      srcElement: (p) =>
        p.vsid === this.props.vsid || p.id === 'nesting-example',
    });
    return [
      [
        'CHANNEL_UI_CLICK_EVENT',
        'codePlayground$OnNestingEvent',
        payloadFilter,
      ],
    ];
  }
  broadcastEvents() {
    return [['button', 'click']];
  }

  onRendered() {
    this.addChannel('CHANNEL_UI');
    this.codePlayground$RandomAddChildCheck();
  }
}
