/* global artifacts, contract, it, assert */
/* eslint-disable prefer-reflect */

const ERC1155Mintable = artifacts.require('ERC1155Mintable.sol');
const BigNumber = require('bignumber.js');

let user1;
let user2;
let user3;
let mainContract;
let totalGasUsed = 0;
contract('ERC1155Mintable', (accounts) => {
    before(async () => {
        user1 = accounts[1];
        user2 = accounts[2];
        user3 = accounts[3];
    });

    it('It should deploy', async () => {
        mainContract = await ERC1155Mintable.new();
        const receipt = await web3.eth.getTransactionReceipt(mainContract.transactionHash);
        totalGasUsed += receipt.gasUsed;
        console.log(`Gas for deployment: ${receipt.gasUsed}`);
    });


    it('Mint initial item', async () => {
        let tx = await mainContract.mint('Hammer', 5, 'https://metadata.enjincoin.io/hammer.json', 0, 'HAM', {from: user1});
        console.log(`Gas for minting of ERC1155: ${tx.receipt.gasUsed}`);
        totalGasUsed += tx.receipt.gasUsed;
        let hammerId = await mainContract.nonce.call();
        tx = await mainContract.mint('Sword', 200, 'https://metadata.enjincoin.io/sword.json', 0, 'SRD', {from: user1});
        let swordId = await mainContract.nonce.call();
        tx = await mainContract.mint('Mace', 1000000, 'https://metadata.enjincoin.io/mace.json', 0, 'MACE', {from: user1});
        let maceId = await mainContract.nonce.call();
    });


    it('batchApprove', async () => {
        let tx = await mainContract.batchApprove(user2, [1,2], [0,0], [1,1], {from: user1});
        console.log(`Batch approval cost: ${tx.receipt.gasUsed}`)
        let hammerApproval = (await mainContract.allowance.call(1, user1, user2)).toNumber();
        let swordApproval = (await mainContract.allowance.call(2, user1, user2)).toNumber();
        let maceApproval = (await mainContract.allowance.call(3, user1, user2)).toNumber();
        assert.strictEqual(hammerApproval, 1);
        assert.strictEqual(swordApproval, 1);
        assert.strictEqual(maceApproval, 0);
    });

    it('batchTransferFrom', async () => {
        let tx = await mainContract.batchTransferFrom(user1, user2, [1,2], [1,1], {from: user2});
        console.log(`Batch Transfer cost: ${tx.receipt.gasUsed}`)

        let hammerBalance = (await mainContract.balanceOf.call(1, user2)).toNumber();
        let swordBalance = (await mainContract.balanceOf.call(2, user2)).toNumber();
        let maceBalance = (await mainContract.balanceOf.call(3, user2)).toNumber();
        assert.strictEqual(hammerBalance, 1);
        assert.strictEqual(swordBalance, 1);
        assert.strictEqual(maceBalance, 0);
    });


    it('transferFrom', async () => {
        let tx = await mainContract.transferFrom(user1, user2, 1, 1, {from: user1});
        let hammerBalance = (await mainContract.balanceOf.call(1, user2)).toNumber();
        console.log(`Gas for sending of ERC1155: ${tx.receipt.gasUsed}`);
        totalGasUsed += tx.receipt.gasUsed;
        assert.equal(hammerBalance, 2);
        console.log(`Total: ${totalGasUsed}`);
    });
    
});