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

  it('should return token details', async function () {
    const symbol = await this.WhalesHeavenToken.symbol.call();
    const decimals = await this.WhalesHeavenToken.decimals.call();

    assert.equal(symbol, "WHT");
    assert.equal(decimals, 18);
  });


  it('should tell total suply', async function () {
    const totalSuply = await this.WhalesHeavenToken.totalSupply.call();
    assert.equal(totalSuply, 50*1000000*ETHER);
  });

  it('should assign creator all tokens', async function () {
    const creatorBalance = await this.WhalesHeavenToken.balanceOf.call(this.owner);
    assert.equal(creatorBalance, 50*1000000*ETHER);
  });

})
