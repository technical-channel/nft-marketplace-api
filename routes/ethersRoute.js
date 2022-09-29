// import express from "express"
// import abi from "../Contracts/Abi/abi.json"
// import { ethers } from "ethers";
// const router = express();
// const ethers = require("ethers")
// const Web3 = require("web3")

// const CONTRACT_ADDRESS = "0xc73b17179bf0c59cd5860bb25247d1d1092c1088"
// const FROM_ADDRESS = "0xc73b17179bf0c59cd5860bb25247d1d1092c1088"
// const web3_ = new Web3("https://mainnet.infura.io/v3/9c48d1f781404552b1a017d597f6bee1")
// // var web3_ = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/9c48d1f781404552b1a017d597f6bee1'));
// // const provider = new ethers.providers.JsonRpcProvider(
// //   "https://bsc-dataseed.binance.org/"
// // );

// const contract = new web3_.eth.Contract(abi, CONTRACT_ADDRESS);
// // const filterFrom = contract.filters.Transfer(FROM_ADDRESS, "0x48965e886238f58002dad383eb0b56afbce95adf", null);

// router.get("/", async (req, res) => {
//     const block = 21746215 - 5000
//     const name = await contract.getPastEvents("Transfer", {
//         filter: {
//           // from: "0xf6b5F6B9F1624C6426d0A0bb1eBe7D8dBff1F9a3",
//           tokenId: 883
//         },
//         fromBlock: 0,
//         toBlock: "latest"
//     }, function(error, events){ console.log(events); }).then((data) => {
//       return res.json(data)
//     });
// })

// export default router
