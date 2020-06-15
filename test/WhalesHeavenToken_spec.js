// /*global contract, config, it, assert*/
const { assertRevert } = require('./helpers/assertRevert');
const WhalesHeavenToken = artifacts.require("WhalesHeavenToken");

const ETHER = 1000000000000000000;

contract("WhalesHeavenToken", accounts => {
  beforeEach(async function () {
    this.owner = accounts[0];
    this.party1 = accounts[1];

    this.WhalesHeavenToken = await WhalesHeavenToken.new({ from: this.owner });
  });

  it('should return new vault address', async function () {
    assert(/^0x([a-fA-F0-9]{40})$/.test(this.WhalesHeavenToken.address));
  });

  it('should tell about approval', async function () {
    const creatorBalance = await this.WhalesHeavenToken.balanceOf.call(this.owner);
    assert.equal(creatorBalance, 50*1000000*ETHER);
  });

})
