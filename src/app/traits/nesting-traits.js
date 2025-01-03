import { SpyneTrait } from 'spyne';
import { NestingChildView } from 'components/nesting-child-view.js';

/**
 * Manages creation and disposal of nested ViewStream instances (e.g., universe → galaxy → solar-system).
 * Includes randomization logic to automatically add multiple children upon load/reset.
 */
export class NestingTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'nestPlayground$';
    super(context, traitPrefix);
  }

  /**
   * Handles "nesting event" actions: 'reset' or 'add' / 'remove'.
   * If eventType is 'reset' on the top-level (e.g., 'universe'), we dispose.
   * Otherwise, we either add a child or remove this instance.
   */
  static nestPlayground$OnNestingEvent(e, props = this.props) {
    // Turn off "addRandom" unless user specifically wants more random additions
    props.addRandom = false;

    const { eventType } = e.payload;

    if (eventType === 'reset') {
      // If top-level, remove the entire nested structure
      if (this.props.data.childType === 'universe') {
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
   * Creates a new top-level "universe" node with random additions (if needed).
   * Typically invoked to start the nesting chain.
   */
  static nestPlayground$AdduniverseNode(props = this.props) {
    this.appendView(
      new NestingChildView({
        addRandom: true,
      }),
    );
  }

  /**
   * Weighted random logic to decide how many times to add another child.
   * e.g., if childType= "galaxy", we might add 2 or 3 children more frequently.
   */
  static nestPlayground$GetRandomAddBool(
    childType = this.props.data.childType,
  ) {
    const ranWeightHash = {
      universe: [2, 2], // Often add 2 children
      galaxy: [1, 1, 2, 2, 2, 3], // Possibly add 1-3 children, with 2 being common
      'solar-system': [0, 1, 2, 2],
      planet: [1, 1, 1, 0],
      ggc1: [1, 0, 0, 0],
      moon: [1, 0, 0, 0],
    };

    const defaultWeight = [1, 0]; // Fallback to either 1 or 0 children

    const weights = ranWeightHash[childType] ?? defaultWeight;

    // Randomly pick an index in weights
    const index = Math.floor(Math.random() * weights.length);
    // The value at that index indicates how many times to add a child
    return weights[index];
  }

  /**
   * If addRandom is true, pick a random number (timesToRun) from nestPlayground$GetRandomAddBool
   * and repeatedly call nestPlayground$AddChild.
   * This can lead to quickly building deep or wide nested structures.
   */
  static nestPlayground$RandomAddChildCheck(props = this.props) {
    const { addRandom } = props;
    if (!addRandom) return;

    if (props.addRandom === true && this.props.childTypeArr.length > 0) {
      const timesToRun = this.nestPlayground$GetRandomAddBool();
      for (let i = 0; i < timesToRun; i++) {
        this.nestPlayground$AddChild();
      }
    }
  }
}
