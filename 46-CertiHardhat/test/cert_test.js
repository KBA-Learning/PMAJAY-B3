const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const {expect} =require('chai');
const {ethers} = require('hardhat');


describe('Cert',function(){
    async function deployContract(){
       const [admin,other] = await ethers.getSigners();
       const cert= await ethers.getContractFactory('Cert');
       const Cert =  await cert.deploy();
        return {Cert,admin,other}
    }
    it("should be deployed only by admin",async function(){
       const {Cert,admin}=await loadFixture(deployContract);
    //    console.log(Cert);
       expect(Cert.deploymentTransaction().from).to.equals(admin.address);
    })

    it("Able to issue & read certificate",async function(){
        const {Cert,admin}=await loadFixture(deployContract); 
        await Cert.issue(1,"Sini","CBA","A","01/12/2024") ;
        const Certi=await Cert.Certificates(1)
        // console.log(Certi);
        expect(Certi[0]).to.equals("Sini");
        expect(Certi[1]).to.equals("CBA");
        expect(Certi[2]).to.equals("A");
        expect(Certi[3]).to.equals("01/12/2024");
    })

    it("Only admin can issue the certificate",async function(){
        const {Cert,other}=await loadFixture(deployContract); 
        await expect(Cert.connect(other).issue(2,"Arya","CED","S","12/12/2024")) .to.be.revertedWith("Unauthorised access");
    })
})
