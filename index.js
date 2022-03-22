//require express
const exp = require("constants");
const express = require("express");
const { parse } = require("path");
const path = require('path')
require("dotenv").config();
const Tx = require('ethereumjs-tx')
const PORT = process.env.PORT || 5000

//require web3
const Web3 = require('web3');
const abiOfToken = require('./tokenBuildfiles/lOML.abi.json');
// console.log(abiOfToken)
//initialize express
const app = express();
//use express json parser
app.use(express.json());
//listen to port
app.listen(PORT,()=>console.log(`process started at port:${PORT}`))

//contract address on chain
const contractAddress = process.env.CONTRACT_ADDRESS;

//account private keys
let userPrivateKey ;
const privateKey = Buffer.from(`${process.env.PRIVATE_KEYS}`, 'hex')||Buffer.from(`${userPrivateKey}`, 'hex');
//create a web3 instance eth
const web3 = new Web3(process.env.INFURAL_RINKBY_CONNECTION_URI,contractAddress);
//create an instance of web3 for our contract //LOML
const lomlContract = new web3.eth.Contract(abiOfToken, contractAddress);
  

let accountAddress;
let account2= "0x0253730F07eBf134343D94D43976973f835FeCbD"

//routes
app.get('/',async (req,res)=>{
    console.log("here")
res.sendFile(path.join(__dirname +"/frontend/index.html"))
});

app.post('/wallet',async (req,res)=>{
    try {
        const symbol = await lomlContract.methods.symbol().call();
        const decimals = await lomlContract.methods.decimals().call();
        const name = await lomlContract.methods.name().call();
        if(web3.utils.isAddress(`${req.body.walletAddress.toString()}`)){
        // if(web3.utils.isAddress("0x6A2001C434bB923Ef18A3CEA0FA97778cd30bb3c")){
            accountAddress=req.body.walletAddress;
            const accountBalance = await web3.utils.fromWei(await web3.eth.getBalance(accountAddress),"ether");
          
            const data ={
                symbol,
                decimals,
                name,
                walletAddress:req.body.walletAddress,
                accountBalance,
                connectedMessage:"Wallet Connected."
            }
            console.log(data,toString(req.body.walletAddress))
            res.json({data});
        }else{
            console.log(data,toString(req.body.walletAddress))
            throw "Not a valid address!"}
    } catch (err) {
        res.json({data:err.message});
    }
    

});
app.post('/stake',async (req,res)=>{
const output = await web3.eth.getBalance(contractAddress)
console.log(output)
console.log("hello")
res.json({data:"success"});
});
// app.post('/buytoken',async (req,res)=>{
// const output = await web3.eth.getBalance(contractAddress)
// console.log(output)
// console.log("hello")
// res.json({data:"success"});
// });
app.post("/buytoken",async (req,res)=>{

    const amountOfEth = req.body.amountOfEth;
    console.log(amountOfEth)
    const address = req.body.address;
    const txCount = await web3.eth.getTransactionCount(address)
    const gasPrice = await web3.eth.getGasPrice();

    const newbuy = lomlContract.methods.buyToken(account2).call();
    console.log(newbuy)
    // const txObject = {
    //     from:address,
    //     nonce:    web3.utils.toHex(txCount),
    //     to:       contractAddress,
    //     value:    web3.utils.toHex(web3.utils.toWei(String(amountOfEth), 'ether')),
    //     gasLimit: web3.utils.toHex(21000),
    //     gasPrice: web3.utils.toHex(web3.utils.toWei(gasPrice, 'gwei')),
    //     data: "" 
    //   }
    // web3.eth.getTransactionCount(address, (err, txCount) => {
    //     // Build the transaction
         
    //       console.log(txObject)
    //         // Sign the transaction
    //         const tx = new Tx(txObject);
    //         tx.sign(privateKey);
        
    //         const serializedTx = tx.serialize();
    //         const raw = '0x' + serializedTx.toString('hex');
        
    //         // Broadcast the transaction
    //         const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
    //             console.log(tx)
    //         });
    //     });
    console.log(txObject)
        res.json({txObject})
    // const trx = web3.eth.sendTransaction({from:eth.coinbase,to:contractAddress,value:web3.toWei(amountOfEth,"ether")});
    // const buy = await lomlContract.methods.buyToken(address).send({from:address,value:web3.utils.toWei(String(amountOfEth),"ether")},(err)=>{console.log(err)});
    // console.log(buy);
});

// const buytokenToaddress= async (amount,address)=>{
    //    const newbuy = await lomlContract.methods.buyToken(account2).send({from:contractAddress,value:web3.utils.toWei(String(amount), 'ether')});
//        const newbuy = await ;
// console.log(newbuy)};
// buytokenToaddress(0.2,"0x6A2001C434bB923Ef18A3CEA0FA97778cd30bb3c")