import React, {useEffect, useState} from 'react';
import './App.css';
import moment from 'moment';
import {Button} from 'react-bootstrap';
import io from 'socket.io-client';

import getWeb3 from "./getWeb3";
import Main from "./Main";

const axios = require('axios');

moment().format();

function Banner() {
  return (
    <div style={{textAlign:'center'}}>
        <p style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 70,
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: '900',
            color:'#72bcd4'
        }}>TVL SYNTHS</p>
    </div>
  );
}

function App() {

    let authSignature = '';

    //const base = `https://api-test.opium.exchange/v1/`; //RINKEBY
    const base = `https://api.opium.exchange/v1/`; //MAINNET

    const [ethWallet, setEthWallet] = useState();
    const [ethAccount, setAccount] = useState("");


/*
    useEffect(() => {
        loadWallet();
    });
*/


    const loadWallet = async() => {

        try {
            // Get network provider and web3 instance.

            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();

            console.log(accounts, "accounts");
            setEthWallet(web3);
            setAccount(accounts[0]);

            await getAuthSignatureMetamask();
            console.log('here!!');

        } catch (error) {
            // Catch any errors for any of the above operations.

            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }


    }


    const getAuthSignatureMetamask = async() => {

        const url = base + `auth/loginData`;
        const result = await axios.get(url);
        const originalMessage = result.data;


        console.log('original message',originalMessage );

        const fromAddress = (await ethWallet)[0];

        let data = JSON.stringify(originalMessage);

        ethWallet.currentProvider.sendAsync(
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
                connectToSocket(fromAddress,signature);

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
                    onClick={ loadWallet() }
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

function Header(){
    return(
        <div style={{height:60}}></div>
    );
}




export default App;
