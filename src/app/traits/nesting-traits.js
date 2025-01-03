import { SpyneTrait } from 'spyne';
import { NestingChildView } from 'components/nesting-child-view.js';

export class NestingTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'nestPlayground$';
    super(context, traitPrefix);
  }
  static nestPlayground$OnNestingEvent(e, props = this.props) {
    props.addRandom = false;
    const { eventType } = e.payload;

    if (eventType === 'reset') {
      if (this.props.data.childType === 'universe') {
        this.disposeViewStream();
      }
    } else {
      return e.payload.eventType === 'add'
        ? this.nestPlayground$AddChild()
        : this.disposeViewStream();
    }
  }

  static nestPlayground$AddChild(props = this.props) {
    const { addRandom } = props;
    const childTypeArr = props.childTypeArr.slice();

    const data = { childType: childTypeArr.shift(), addRandom };
    this.appendView(
      new NestingChildView({
        data,
        childTypeArr,
        addRandom,
      }),
      '.children',
    );
  }
  static nestPlayground$AdduniverseNode(props = this.props) {
    this.appendView(
      new NestingChildView({
        addRandom: true,
      }),
    );
  }

  static nestPlayground$GetRandomAddBool(
    childType = this.props.data.childType,
  ) {
    const ranWeightHash = {
      universe: [2, 2],
      galaxy: [1, 1, 2, 2, 2, 3],
      'solar-system': [0, 1, 2, 2],
      planet: [1, 1, 1, 0],
      ggc1: [1, 0, 0, 0],
      moon: [1, 0, 0, 0],
    };

    const defaultWeight = [1, 0];

    // For simplicity, '1' appears more frequently to increase its likelihood
    const weights = ranWeightHash[childType] ?? defaultWeight;
    // Select a random index based on the weights
    const index = Math.floor(Math.random() * weights.length);

    // Retrieve the number of times to run from the weights array
    return weights[index];
  }

  static nestPlayground$RandomAddChildCheck(props = this.props) {
    const { addRandom } = props;
    if (addRandom) {
      if (props.addRandom === true && this.props.childTypeArr.length > 0) {
        const timesToRun = this.nestPlayground$GetRandomAddBool();

        for (let i = 0; i < timesToRun; i++) {
          this.nestPlayground$AddChild();
        }
      }
    }
  }
}
