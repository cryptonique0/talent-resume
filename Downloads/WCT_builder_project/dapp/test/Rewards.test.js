const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Rewards Contract", function () {
  let rewards;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Rewards = await ethers.getContractFactory("Rewards");
    rewards = await Rewards.deploy();
    await rewards.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await rewards.owner()).to.equal(owner.address);
    });

    it("Should mint initial supply to owner", async function () {
      const ownerBalance = await rewards.balanceOf(owner.address);
      expect(ownerBalance).to.be.gt(0);
    });

    it("Should have correct name and symbol", async function () {
      expect(await rewards.symbol()).to.equal("WCTD");
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint tokens", async function () {
      const mintAmount = ethers.parseUnits("100", 18);
      await rewards.mint(addr1.address, mintAmount);
      
      const balance = await rewards.balanceOf(addr1.address);
      expect(balance).to.equal(mintAmount);
    });

    it("Should reject minting from non-owner", async function () {
      const mintAmount = ethers.parseUnits("100", 18);
      await expect(
        rewards.connect(addr1).mint(addr2.address, mintAmount)
      ).to.be.revertedWith("only owner");
    });
  });

  describe("Claimable", function () {
    it("Should allow owner to set claimable amount", async function () {
      const claimAmount = ethers.parseUnits("50", 18);
      await rewards.setClaimable(addr1.address, claimAmount);
      
      expect(await rewards.claimable(addr1.address)).to.equal(claimAmount);
    });

    it("Should allow user to claim tokens", async function () {
      const claimAmount = ethers.parseUnits("50", 18);
      await rewards.setClaimable(addr1.address, claimAmount);
      
      await rewards.connect(addr1).claim();
      
      const balance = await rewards.balanceOf(addr1.address);
      expect(balance).to.equal(claimAmount);
      expect(await rewards.claimable(addr1.address)).to.equal(0);
    });

    it("Should reject claim when nothing is claimable", async function () {
      await expect(
        rewards.connect(addr1).claim()
      ).to.be.revertedWith("nothing to claim");
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      const transferAmount = ethers.parseUnits("10", 18);
      
      // Give addr1 some tokens first
      await rewards.mint(addr1.address, ethers.parseUnits("100", 18));
      
      // Transfer from addr1 to addr2
      await rewards.connect(addr1).transfer(addr2.address, transferAmount);
      
      const addr2Balance = await rewards.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(transferAmount);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await rewards.balanceOf(owner.address);
      const tooMuch = initialOwnerBalance + ethers.parseUnits("1", 18);
      
      await expect(
        rewards.transfer(addr1.address, tooMuch)
      ).to.be.reverted;
    });
  });
});
