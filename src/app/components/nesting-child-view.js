import { ViewStream, ChannelPayloadFilter } from 'spyne';
import { NestingTraits } from 'traits/nesting-traits.js';
import NestingChildTmpl from './templates/nesting-child.tmpl.html';

/**
 * Each NestingChildView represents one level (website, page, component, etc.)
 * in the nested ViewStream hierarchy. It:
 *  - Applies NestingTraits for add/remove logic.
 *  - Filters UI click events so only buttons belonging to this instance (or reset) trigger actions.
 *  - Potentially adds random sub-children upon render if addRandom is true.
 */
export class NestingChildView extends ViewStream {
  constructor(props = {}) {
    // Attach NestingTraits (logic to add or remove children, handle random branching, etc.)
    props.traits = [NestingTraits];

    // Provide default data in case none was passed
    props.data ??= { childType: 'website' };
    // Whether to add random sub-children automatically
    props.addRandom ??= false;
    // The queue of possible child types to nest further
    props.childTypeArr ??= [
      'page',
      'section',
      'component',
      'widget',
      'element',
      'cta',
    ];

    // Use a CSS class reflecting the child's type, e.g. "branch website"
    props.class = `branch ${props.data.childType}`;

    // The HTML template used by SpyneJS to render controls, child area, etc.
    props.template = NestingChildTmpl;

    // Listens to UI Channel click events
    props.channels = ['CHANNEL_UI'];
    super(props);
  }

  /**
   * Adds an action listener that only fires if:
   *  - The payload has a 'childType' matching this instance's childType or 'reset'
   *  - The source element is either the same vsid or the #nesting-example
   *
   * This ensures that random / reset actions don't inadvertently affect unrelated nodes.
   */
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
        'nestPlayground$OnNestingEvent',
        payloadFilter,
      ],
    ];
  }

  /**
   * Tells SpyneJS which DOM events (clicks on <button>) to broadcast to CHANNEL_UI.
   * This pairs with addActionListeners() to trigger the nest or dispose logic.
   */
  broadcastEvents() {
    return [['button', 'click']];
  }

  /**
   * After the DOM is rendered, subscribe to CHANNEL_UI and possibly add random sub-children
   * based on the weighting logic in NestingTraits.
   */
  onRendered() {
    this.nestPlayground$RandomAddChildCheck();
    if (this.props.data.childType === 'website') {
      this.appendViewAfter(
        new ViewStream({ class: 'ui-element', data: 'header' }),
        'p',
      );
      this.appendViewAfter(
        new ViewStream({ class: 'ui-element', data: 'footer' }),
        '.children',
      );
    }
  }
}
