import React from 'react';
import './App.css';
import {Button,Row,Col} from 'react-bootstrap';
import Web3 from "web3";

import Main from "./Main";
import Header from "./Header";
import Banner from "./Banner";
import web3Modal from "./WalletModal";

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
                        `${this.state.account.substring(0,6)}...${this.state.account.slice(this.state.account.length - 4)}`
                    }</Button>
                </div>

                <Banner/>
                <Row>
                    <Col xs={0} sm={1} md={2} lg={2}></Col>
                    <Col>
                        <Main web3={this.state.web3} />
                        <div style={{padding:20}}>

                            <div style={{marginTop:100}}>
                                <p style={{fontSize:20,fontWeight:'bold'}}>What is a project's TVL?</p>
                                <p style={{fontSize:18}}>
                                    TVL stands for Total Value Locked.  It is a measure of the combined value of deposited assets in a protocol and is often used as a metric to track how successful a platform is.
                                </p>
                            </div>

                            <div style={{marginTop:40}}>
                                <p style={{fontSize:20,fontWeight:'bold'}}>Why do we need derivatives of a project's Total Locked Value?</p>
                                <p style={{fontSize:18}}>
                                    While many projects have a native token, speculation is the main driver of token prices.
                                    TVL Synths offer a new way to invest in the success of a project, tied to the platform's actual use!
                                </p>
                            </div>

                            <div style={{marginTop:40, marginBottom:300}}>
                                <p style={{fontSize:20,fontWeight:'bold'}}>Are TVL Syths safe?</p>
                                <p style={{fontSize:18}}>
                                    Yes.  All derivatives are powered by the UMA protocol audited by  Openzeppelin Security.

                                </p>
                            </div>



                        </div>
                    </Col>
                    <Col xs={0} sm={1} md={2} lg={2}></Col>
                </Row>
            </div>
        );
    }
}

export default App;
