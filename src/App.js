import React from 'react';
import './App.css';
import {Button,Row,Col} from 'react-bootstrap';
import Web3 from "web3";

import Main from "./Main";
import Header from "./Header";
import Banner from "./Banner";
import web3Modal from "./WalletModal";

const axios = require('axios');

//Opium Globals
//const base = `https://api-test.opium.exchange/v1/`; //RINKEBY
const base = `https://api.opium.exchange/v1/`; //MAINNET


class App extends React.Component {

    constructor() {
        super();

        this.state = {
            web3: null,
            account: null,
            authSignature:null
        }

    }

    async loadWeb3(){
        const provider = await web3Modal.connect();
        const web3 = new Web3(provider);
        let account = (await web3.eth.getAccounts())[0];
        this.setState({ web3: web3, account: account });

        this.getAuthSignatureMetamask();
    }

    async getAuthSignatureMetamask(){

        let that = this;
        const fromAddress = (await this.state.web3.eth.getAccounts())[0];

        const url = base + `auth/loginData`;
        const result = await axios.get(url);
        const originalMessage = result.data;
        let data = JSON.stringify(originalMessage);

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

                console.log("authSignature ", signature);
                that.setState({authSignature:signature});

            }
        );

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
                        "Unlock Wallet"
                        :
                        `${this.state.account.substring(0,6)}`+'...'+`${this.state.account.slice(this.state.account.length - 4)}`
                    }</Button>
                </div>

                <Banner/>
                <Row>
                    <Col xs={0} sm={1} md={2} lg={2}></Col>
                    <Col>
                         <Main web3={this.state.web3} authSignature={this.state.authSignature} base={base} />
                    </Col>
                    <Col xs={0} sm={1} md={2} lg={2}></Col>
                </Row>
            </div>
        );
    }
}

export default App;
