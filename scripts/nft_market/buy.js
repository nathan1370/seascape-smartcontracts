let NftMarket = artifacts.require("NftMarket");
let Crowns = artifacts.require("CrownsToken");
let Nft = artifacts.require("SeascapeNft");


let accounts;

module.exports = async function(callback) {
    const networkId = await web3.eth.net.getId();
    let res = await init(networkId);
    callback(null, res);
};

let init = async function(networkId) {
    accounts = await web3.eth.getAccounts();
    console.log(accounts);

    let nftMarket = await NftMarket.at("0xAd7C13003832A67734CDDA723AE4E14b8d9f21Af");
    let nft     = await Nft.at("0x7115ABcCa5f0702E177f172C1c14b3F686d6A63a");
    let crowns  = await Crowns.at("0x168840Df293413A930d3D40baB6e1Cd8F406719D");


    console.log(await nftMarket.getSales(0));

    //must fill correct nftId
    let nftId = 318;
    let approveAmount = web3.utils.toWei("1", "ether");


    let user = accounts[0];
    console.log(`Using ${user}`);

    //approve spending of crowns
    await crowns.approve(nftMarket.address, approveAmount, {from: user}).catch(console.error);


    let index = await nftMarket.nftIdToIndex(nftId).catch(console.error);
    console.log(`Sales index of ${nftId} is ${index}`);

    // debug that sales is correct
    let salesObject = await nftMarket.getSalesByNftId(nftId).catch(console.error);
    console.log(salesObject);

    //execute buy
    let buy = await nftMarket.buyByNftId(nftId, crowns.address, {from: user}).catch(console.error);
    console.log(buy);


}.bind(this);