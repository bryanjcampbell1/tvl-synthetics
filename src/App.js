import React, {useEffect, useState} from 'react';
import './App.css';
import moment from 'moment';
import {Button} from 'react-bootstrap';
import io from 'socket.io-client';


import Main from "./Main";
import WalletConnectProvider from "@walletconnect/web3-provider";

import Web3 from "web3";
import Web3Modal from "web3modal";


//Opium Globals
let authSignature = '';
//const base = `https://api-test.opium.exchange/v1/`; //RINKEBY
const base = `https://api.opium.exchange/v1/`; //MAINNET

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: "ed09c851cd06475aba678fdb5e84a15c" // required
        }
    }
};

const web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
});

const axios = require('axios');

moment().format();

function Header(){
    return(
        <div style={{height:60}}></div>
    );
}

function Banner() {
  return (
    <div style={{textAlign:'center'}}>
        <p style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 70,
            fontStyle: "italic",
            fontVariant: "normal",
            fontWeight: '900',
            color:'rgb(22,162,185)'
        }}>TVL SYNTHS</p>
    </div>
  );
}


class App extends React.Component {

    constructor() {
        super();

        this.state = {
            web3: null,
            account: null,
            authSignature:null
        }

    }

    componentDidMount(){
        //this.loadWallet();
    }

    async loadWeb3(){
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);

        let account = (await web3.eth.getAccounts())[0];

        this.setState({ web3: web3, account: account });

        this.getAuthSignatureMetamask();

    }

    async getAuthSignatureMetamask(){

        const url = base + `auth/loginData`;
        const result = await axios.get(url);
        const originalMessage = result.data;


        console.log('original message',originalMessage );

        const fromAddress = (await this.state.web3.eth.getAccounts())[0];

        let data = JSON.stringify(originalMessage);

        let that = this;


        this.state.web3.currentProvider.sendAsync(
            {
                method: "eth_signTypedData_v3",
                params: [fromAddress, data],
                from: fromAddress
            },
            function(err, result) {
                if (err) {
                    return console.error(err);
                }
                const signature = result.result;
                authSignature = signature;

                console.log("authSignature ", authSignature);
                //that.connectToSocket(fromAddress,signature);
                that.setState({authSignature:authSignature});

            }
        );

    }

    async connectToSocket(address,signature){
        // const socket = io(`https://api-test.opium.exchange/v1`);
        const socket = io(`https://api.opium.exchange/v1`);
        
        socket.on('position:address', (msg) => console.log('Position MSG', msg))

        socket.on('error:message', (msg) => {
            console.log('ERROR MSG', msg)
        })

        socket.on('connect', () => {
            console.log('Connected to socket')

            socket.emit('subscribe', {
                ch: 'position:address',
                a: address,
                sig: signature
            })

        })



    }



    render() {
        return(
            <div style={{backgroundColor:'#FFF5EE'}}>
                <Header/>
                <div style={{display:'flex',justifyContent:'flex-end', padding:30, marginTop:-60}}>
                    <Button
                        style={{borderColor:'#ff7961',
                            backgroundColor:'#ff7961',
                            width:160
                        }}
                        onClick={() => this.loadWeb3() }

                    >{(!this.state.account)?
                        "Unlock Metamask"
                        :
                        `${this.state.account.substring(0,6)}`+'...'+`${this.state.account.slice(this.state.account.length - 4)}`
                    }</Button>
                </div>
                <Banner/>
                <Main web3={this.state.web3} authSignature={this.state.authSignature} base={base} />
            </div>
        );
    }
}




/*
function App() {

    let authSignature = '';

    //const base = `https://api-test.opium.exchange/v1/`; //RINKEBY
    const base = `https://api.opium.exchange/v1/`; //MAINNET

    const [ethWallet, setEthWallet] = useState();
    const [ethAccount, setAccount] = useState("");

    const [clickNumber, setClickNumber] = useState(0);



    useEffect(() => {
        loadWallet();
    }, [clickNumber]);

    const loadWallet = async () => {
        console.log('sofat2');

        try {
            // Get network provider and web3 instance.
            console.log('sofat3');

            const web3 = await getWeb3();
            console.log('sofat4');

            const accounts = await web3.eth.getAccounts();
            console.log('sofat5');


            console.log(accounts, "accounts");


            setEthWallet(web3);
            setAccount(accounts[0]);

           //getAuthSignatureMetamask(accounts[0], web3);
            console.log('here!!');


        } catch (error) {
            // Catch any errors for any of the above operations.

            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }


    }


    const getAuthSignatureMetamask = async(account, myWeb3) => {

        const url = base + `auth/loginData`;
        const result = await axios.get(url);
        const originalMessage = result.data;


        console.log('original message',originalMessage );

        //const fromAddress = (await ethWallet)[0];

        let data = JSON.stringify(originalMessage);

        myWeb3.currentProvider.sendAsync(
            {
                method: "eth_signTypedData_v3",
                params: [account, data],
                from: account
            },
            function(err, result) {
                if (err) {
                    return console.error(err);
                }
                const signature = result.result;
                authSignature = signature;

                console.log("authSignature ", authSignature);
                //connectToSocket(account,signature);

            }
        );

    }

    const connectToSocket = async(address,signature) =>{

        // const socket = io(`https://api-test.opium.exchange/v1`);
        const socket = io(`https://api.opium.exchange/v1`);
        socket.on('position:address', (msg) => console.log('Position MSG', msg))

        socket.on('error:message', (msg) => {
            console.log('ERROR MSG', msg)
        })

        socket.on('connect', () => {
            console.log('Connected to socket')

            socket.emit('subscribe', {
                ch: 'position:address',
                a: address,
                sig: signature
            })

        })
    }


    return (
        <div style={{backgroundColor:'#FFF5EE'}}>
            <Header/>
            <div style={{display:'flex',justifyContent:'flex-end', padding:30, marginTop:-60}}>
                <Button
                    style={{borderColor:'#ff7961',
                            backgroundColor:'#ff7961'
                    }}

                >{(!ethWallet)?
                    "Unlock Metamask"
                    :
                    `${ethAccount.substring(0,6)}`+'...'+`${ethAccount.slice(ethAccount.length - 4)}`
                }</Button>
            </div>
            <Banner/>
            <Main wallet={ethWallet} />
        </div>
    );
}
*/





export default App;
