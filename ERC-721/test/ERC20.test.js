var BenchNFT = artifacts.require("BenchNFT");

contract('Main benchmarks for the ERC721 example', async (accounts) => {
    let totalGasUsed = 0;

    const owner = accounts[0];
    const account1 = accounts[1];
    const account2 = accounts[2];
    let nonce = 0;
    let benchNFT;

    it("It should be able to be deployed and return the deployment gas", async () => {
        benchNFT = await BenchNFT.new("testToken", "tt");
        const receipt = await web3.eth.getTransactionReceipt(benchNFT.transactionHash);
        totalGasUsed += receipt.gasUsed;
        console.log(`Gas for deployment: ${receipt.gasUsed}`);
    });
    it("It should be able to mint a token to a user", async ()=>{
        nonce++;
        var err, tx = await benchNFT.mint(owner, nonce, "https://metadata.enjincoin.io/hammer.json" ,{from: owner});
        const receipt = await web3.eth.getTransactionReceipt(tx.tx);
        
        totalGasUsed += receipt.gasUsed;
        console.log(`Gas for minting: ${receipt.gasUsed}`);
    });
    it("I should be able to send an x amount of tokens and see how much gas this costs", async ()=>{
        const ownerOfToken = await benchNFT.ownerOf(nonce);
        assert.equal(owner, ownerOfToken);

        const transfer = await benchNFT.transferFrom(owner, account1, 1, {from: owner});
        totalGasUsed += transfer.receipt.gasUsed;
        console.log(`Gas for transfers: ${transfer.receipt.gasUsed}`);

        const newOwner = (await benchNFT.ownerOf(nonce));
        
        assert.equal(newOwner, account1);
        console.log(`Total gas used: ${totalGasUsed}`);
    });
});