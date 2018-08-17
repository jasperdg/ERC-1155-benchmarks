var BenchCoin = artifacts.require("BenchCoin");

contract('Main benchmarks for the ERC20 example', async (accounts) => {
    let totalGasUsed = 0;

    const owner = accounts[0];
    const account1 = accounts[1];
    const account2 = accounts[2];
    let benchCoin;
    it("It should be able to be deployed and return the deployment gas", async () => {
        benchCoin = await BenchCoin.new("testToken", "tt", 10000000000000);
        const receipt = await web3.eth.getTransactionReceipt(benchCoin.transactionHash);
        totalGasUsed += receipt.gasUsed;
        console.log(`Gas for deployment: ${receipt.gasUsed}`);
    })

    it("I should be able to send an x amount of tokens and see how much gas this costs", async ()=>{
        const amount = 1;
        const transfer = await benchCoin.transfer(account1, amount, {from: owner});

        totalGasUsed += transfer.receipt.gasUsed;
        console.log(`Gas for transfers: ${transfer.receipt.gasUsed}`);

        const newBalance = (await benchCoin.balanceOf(account1)).toNumber();
        
        assert.equal(amount, (newBalance));
        console.log(`Total gas used: ${totalGasUsed}`);

    })
});