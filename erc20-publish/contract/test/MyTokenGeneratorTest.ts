import { expect } from "chai";
import { ethers } from "hardhat";

const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

const generateRandomString = (charCount = 7): string => {
  const str = Math.random().toString(36).substring(2).slice(-charCount);
  return str.length < charCount
    ? str + "a".repeat(charCount - str.length)
    : str;
};

describe("MyTokenGenerator", function () {
  describe("Deployment", function () {
    async function deployTokenFixture() {
      // Get the Signers here.
      const [owner] = await ethers.getSigners();

      // To deploy our contract, we just have to call ethers.deployContract and await
      // its waitForDeployment() method, which happens once its transaction has been
      // mined.
      // const hardhatTokenGenerator = await ethers.deployContract(
      //   "MyTokenGenerator"
      // );
      const TokenGenerator = await ethers.getContractFactory(
        "MyTokenGenerator"
      );

      const hardhatTokenGenerator = await TokenGenerator.deploy();
      // console.log("deployed");
      // console.log(hardhatTokenGenerator);
      // await hardhatTokenGenerator.waitForDeployment();

      // Fixtures can return anything you consider useful for your tests
      return { hardhatTokenGenerator, owner };
    }

    // If the callback function is async, Mocha will `await` it.
    it("Should set the right owner", async function () {
      // We use loadFixture to setup our environment, and then assert that
      // things went well
      const { hardhatTokenGenerator, owner } = await loadFixture(
        deployTokenFixture
      );
      const deployedContractAddress = await hardhatTokenGenerator.runner
        .address;

      // This test expects the owner variable stored in the contract to be
      // equal to our Signer's owner
      // console.log(
      //   `deployedContractAddress: ${deployedContractAddress} vs owner.address:${owner.address} `
      // );
      expect(deployedContractAddress).to.equal(owner.address);
    });

    it("Should set the token count 0", async function () {
      const { hardhatTokenGenerator, owner } = await loadFixture(
        deployTokenFixture
      );

      expect(await hardhatTokenGenerator.myTokensCount()).to.equal(0);
    });

    it("Should generate token", async function () {
      const { hardhatTokenGenerator, owner } = await loadFixture(
        deployTokenFixture
      );

      const tx = await hardhatTokenGenerator
        .connect(owner)
        .createMyToken("SHINYA", "SHI");

      expect(await hardhatTokenGenerator.myTokensCount()).to.equal(1);
    });

    it("Should access to the token", async function () {
      const { hardhatTokenGenerator, owner } = await loadFixture(
        deployTokenFixture
      );

      const count = 5;
      for (let i = 0; i < count; i++) {
        let name = generateRandomString(5);
        let sym = name.substr(0, 3);
        console.log(`name: ${name}, sym: ${sym}`);
        let tx = await hardhatTokenGenerator
          .connect(owner)
          .createMyToken(name, sym);
        console.log(tx);
        // console.log(`name: ${tx.name}`);
        // console.log(`sym: ${tx.sym}`);
      }

      const tokens = await hardhatTokenGenerator.myTokens(count, 0);
      const tokens1 = await tokens[0];
      console.log("Token");
      console.log(tokens);
      console.log(tokens1);

      expect(await hardhatTokenGenerator.myTokensCount()).to.equal(count);
    });

    // it("Always fails.", async function () {
    //   const [owner] = await ethers.getSigners();

    //   // const tokenGenerator = await ethers.deployContract("MyTokenGenerator");
    //   const echoContractFactory = await ethers.getContractFactory(
    //     "MyTokenGenerator"
    //   );
    //   const echoContract = await echoContractFactory.deploy();
    //   const ethEcho = await echoContract.waitForDeployment();

    //   const deployedContractAddress = await ethEcho.getAddress();
    //   console.log("Contract deployed to:", deployedContractAddress);
    //   console.log("Contract deployed by:", owner.address);

    //   // expect(false).to.equal(true);
    // });
    // ``;
  });
});
