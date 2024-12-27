import { add } from 'ramda';
import { expect } from 'chai';
import { SpyneApp, SpyneAppProperties } from 'spyne';

//import { describe, it } from 'mocha';

describe('Basic Chai Test', () => {
  it('2 + 2 equals 4', () => {
    expect(add(2, 2)).to.equal(4);
  });
});

describe('should initialize spyne', () => {
  it('should be show that spyne has initialized', () => {
    SpyneApp.init();
    //console.log("SpyneAppProperties ",SpyneAppProperties)
    expect(SpyneAppProperties.initialized).to.be.true;
  });
});
