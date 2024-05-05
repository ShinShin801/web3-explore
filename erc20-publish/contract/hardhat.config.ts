import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// import "@nomiclabs/hardhat-waffle";
import "dotenv/config";
// require("dotenv").config();

const { ALCHEMY_ENDPOINT, PRIVATE_KEY } = process.env;
console.log();

// console.log("AAAAAAAA");
// console.log(utils.parseEther("1000").toString());

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  // solidity: "0.8.9",
  networks: {
    zkEVM: {
      url: ALCHEMY_ENDPOINT,
      accounts: [`${PRIVATE_KEY}`],
    },
  },
};

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// module.exports = {
//   solidity: "0.8.9",
//   networks: {
//     mumbai: {
//       url: API_URL,
//       accounts: [`0x${PRIVATE_KEY}`]
//     }
//   }
// };

export default config;
