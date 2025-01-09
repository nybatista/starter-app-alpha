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
      'alien',
    ];
    props.addRandom = true;

    // A small heading for context, plus the reset button
    props.template = `
<div class="title-bar">
  <button class="btn reset" data-reset="true" data-add-random="false" 
          data-child-type="reset" data-event-type="reset">
    <span class="material-symbols-outlined">&#xE5D5</span>
  </button>
</div>
`;

    super(props);
  }

  addActionListeners() {
    return [
      // When user clicks the .reset button, call nestPlayground$AddUniverseNode
      // (thus triggering a reset).
      ['CHANNEL_UI_CLICK_EVENT', 'nestPlayground$AddUniverseNode', '.reset'],
    ];
  }

  broadcastEvents() {
    // Broadcasting the click on .reset to CHANNEL_UI so we can respond in addActionListeners.
    return [['.reset', 'click']];
  }

  /**
   * We immediately add a top-level “universe” node, along with random children,
   * to kick off the nesting demo.
   */
  onRendered() {
    this.nestPlayground$AddUniverseNode();
    this.addChannel('CHANNEL_UI');
  }
}
