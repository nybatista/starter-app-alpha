import { ViewStream } from 'spyne';
import { NestingStage } from 'components/nesting-stage-view.js';

/**
 * AppView is the main entry point for our nesting example. It:
 *  - Defines a <main> tag as the root.
 *  - Appends a NestingStage instance.
 */
export class AppView extends ViewStream {
  constructor(props = {}) {
    // Minimal configuration: tagName=main, no traits or channels needed here
    props.tagName = 'main';
    props.id = 'nest-app';
    super(props);
  }

  /**
   * No channel actions needed for this top-level view.
   */
  addActionListeners() {
    return [];
  }

  /**
   * No DOM events broadcast here—NestingStage handles its own events.
   */
  broadcastEvents() {
    return [];
  }

  /**
   * Once the <main id="nest-app"> element is rendered,
   * we instantiate and append a NestingStage,
   */
  onRendered() {
    this.appendView(new NestingStage());
  }
}
