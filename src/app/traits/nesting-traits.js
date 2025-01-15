import { SpyneTrait } from 'spyne';
import { NestingChildView } from 'components/nesting-child-view.js';

/**
 * Manages creation and disposal of nested ViewStream instances (e.g., website → page → section).
 * Includes randomization logic to automatically add multiple children upon load/reset.
 */
export class NestingTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'nestPlayground$';
    super(context, traitPrefix);
  }

  /**
   * Handles "nesting event" actions: 'reset' or 'add' / 'remove'.
   * If eventType is 'reset' on the top-level (e.g., 'website'), we dispose.
   * Otherwise, we either add a child or remove this instance.
   */
  static nestPlayground$OnNestingEvent(e, props = this.props) {
    // Turn off "addRandom" unless user specifically wants more random additions
    props.addRandom = false;

    const { eventType } = e.payload;

    if (eventType === 'reset') {
      // If top-level, remove the entire nested structure
      if (this.props.data.childType === 'website') {
        this.disposeViewStream();
      }
      return;
    }

    // For 'add' or 'remove' event
    return eventType === 'add'
      ? this.nestPlayground$AddChild()
      : this.disposeViewStream();
  }

  /**
   * Adds one child to this instance.
   * - childTypeArr is a queue of possible child types (shifted from the front).
   * - The next child is appended into '.children' within the current DOM element.
   */
  static nestPlayground$AddChild(props = this.props) {
    const { addRandom } = props;
    const childTypeArr = props.childTypeArr.slice(); // copy array to avoid mutation

    const data = {
      childType: childTypeArr.shift(), // pick next child type
      addRandom,
    };

    this.appendView(
      new NestingChildView({ data, childTypeArr, addRandom }),
      '.children',
    );
  }

  /**
   * Creates a new top-level "website" node with random additions (if needed).
   * Typically invoked to start the nesting chain.
   */
  static nestPlayground$AddwebsiteNode() {
    this.appendView(
      new NestingChildView({
        addRandom: true,
      }),
    );
  }

  /**
   * Weighted random logic to decide how many times to add another child.
   * e.g., if childType= "page", we might add 2 or 3 children more frequently.
   */
  static nestPlayground$GetRandomAddCount(
    childType = this.props.data.childType,
  ) {
    const ranWeightHash = {
      website: [1], // Often add 2 children
      page: [1, 1, 1, 2, 2, 3], // Possibly add 1-3 children, with 2 being common
      'section': [1, 1, 2, 2],
      component: [1, 1, 1, 2],
      ggc1: [1, 1, 1, 0],
      widget: [1, 1, 0, 0],
    };

    const defaultWeight = [1, 0]; // Fallback to either 1 or 0 children

    const weights = ranWeightHash[childType] ?? defaultWeight;

    // Randomly pick an index in weights
    const index = Math.floor(Math.random() * weights.length);
    // The value at that index indicates how many times to add a child
    return weights[index];
  }

  /**
   * If addRandom is true, pick a random number (timesToRun) from nestPlayground$GetRandomAddCount
   * and repeatedly call nestPlayground$AddChild.
   * This can lead to quickly building deep or wide nested structures.
   */
  static nestPlayground$RandomAddChildCheck(props = this.props) {
    const { addRandom } = props;
    if (!addRandom) return;

    if (props.addRandom === true && this.props.childTypeArr.length > 0) {
      const timesToRun = this.nestPlayground$GetRandomAddCount();
      for (let i = 0; i < timesToRun; i++) {
        this.nestPlayground$AddChild();
      }
    }
  }
}
