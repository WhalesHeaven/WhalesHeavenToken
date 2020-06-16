// /*global contract, config, it, assert*/
const { assertRevert } = require('./helpers/assertRevert');
const WhalesHeavenToken = artifacts.require("WhalesHeavenToken");
const WhalesHeavenBountyPayout = artifacts.require("WhalesHeavenBountyPayout");

const ETHER = 1000000000000000000;
const ETHERSTRING ="000000000000000000";

contract("WhalesHeavenToken", accounts => {
  beforeEach(async function () {
    this.owner = accounts[0];

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

  describe("Bounty Payout", function() {
    beforeEach(async function () {
      this.party1 = accounts[1];
      this.party2 = accounts[2];
      this.party3 = accounts[3];

      this.amount1 = "235" + ETHERSTRING;
      this.amount2 = "10000" + ETHERSTRING;
      this.amount3 = "700" + ETHERSTRING;

      this.WhalesHeavenBountyPayout = await WhalesHeavenBountyPayout.new(this.WhalesHeavenToken.address, { from: this.owner });
    });

    it('should return new vault address', async function () {
      assert(/^0x([a-fA-F0-9]{40})$/.test(this.WhalesHeavenBountyPayout.address));
    });

    it('should make 0 party balance', async function () {
      await this.WhalesHeavenToken.transfer(
        this.WhalesHeavenBountyPayout.address,
        "50000000" + ETHERSTRING,
        { from: this.owner }
      );

      const party1Balance = await this.WhalesHeavenToken.balanceOf.call(this.party1);
      const party2Balance = await this.WhalesHeavenToken.balanceOf.call(this.party2);
      const party3Balance = await this.WhalesHeavenToken.balanceOf.call(this.party3);

      assert.equal(party1Balance.toString(), "0");
      assert.equal(party2Balance.toString(), "0");
      assert.equal(party3Balance.toString(), "0");
    });

    it('should not make mass payout without balance', async function () {
      await assertRevert(
        this.WhalesHeavenBountyPayout.bountyDrop(
          [this.party1, this.party2, this.party3],
          [this.amount1, this.amount2, this.amount3],
          { from: this.owner }
        )
      );
    });

    it('should make mass payout', async function () {
      await this.WhalesHeavenToken.transfer(
        this.WhalesHeavenBountyPayout.address,
        "50000000" + ETHERSTRING,
        { from: this.owner }
      );

      await this.WhalesHeavenBountyPayout.bountyDrop(
        [this.party1, this.party2, this.party3],
        [this.amount1, this.amount2, this.amount3],
        { from: this.owner }
      );

      const contractBalance = await this.WhalesHeavenToken.balanceOf.call(this.WhalesHeavenBountyPayout.address);
      assert.equal(contractBalance.toString(), "49989065" + ETHERSTRING);

      const totalSuply = await this.WhalesHeavenToken.totalSupply.call();
      assert.equal(totalSuply, 50*1000000*ETHER);

      const party1Balance = await this.WhalesHeavenToken.balanceOf.call(this.party1);
      const party2Balance = await this.WhalesHeavenToken.balanceOf.call(this.party2);
      const party3Balance = await this.WhalesHeavenToken.balanceOf.call(this.party3);

      assert.equal(party1Balance.toString(), "235" + ETHERSTRING);
      assert.equal(party2Balance.toString(), "10000" + ETHERSTRING);
      assert.equal(party3Balance.toString(), "700" + ETHERSTRING);
    });


    it('should not allow payout to not an owner', async function () {
      this.party4 = accounts[4];

      await this.WhalesHeavenToken.transfer(
        this.WhalesHeavenBountyPayout.address,
        "50000000" + ETHERSTRING,
        { from: this.owner }
      );

      await assertRevert(
        this.WhalesHeavenBountyPayout.bountyDrop(
          [this.party1, this.party2, this.party3],
          [this.amount1, this.amount2, this.amount3],
          { from: this.party4 }
        )
      );
    });
  });
})
