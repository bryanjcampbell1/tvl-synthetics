import React from 'react';
import './App.css';
import {Button,Row,Col} from 'react-bootstrap';
import Web3 from "web3";

import Home from "./Home";
import web3Modal from "./WalletModal";
import Portfolio from "./Portfolio";
import About from "./About";

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            web3: null,
            account: null,
            authSignature:null,
            page:'home'
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

                <div style={{
                    display:'flex',
                    justifyContent:'space-between',
                    padding:30,
                    backgroundColor:'#FFF5EE'
                }}>

                    <div>
                        <p style={{
                            fontFamily: "Arial, Helvetica, sans-serif",
                            fontSize: 35,
                            fontStyle: "italic",
                            fontVariant: "normal",
                            fontWeight: '900',
                            color:'rgb(22,162,185)'
                        }}>TVL SYNTHS</p>
                    </div>

                    <div style={{
                        display:'flex',
                        marginTop:-8
                    }}>
                        <p onClick={() => this.setState({page:'home'})}
                           style={{
                            fontSize: 20,
                            fontWeight: '700',
                            color:'rgb(22,162,185)',
                            margin:20
                        }}>Home</p>
                        <p  onClick={() => this.setState({page:'portfolio'})}
                            style={{
                            fontSize: 20,
                            fontWeight: '700',
                            color:'rgb(22,162,185)',
                            margin:20
                        }}> My Portfolio</p>
                        <p  onClick={() => this.setState({page:'about'})}
                            style={{
                            fontSize: 20,
                            fontWeight: '700',
                            color:'rgb(22,162,185)',
                            margin:20
                        }}>About</p>
                    </div>

                    <div >
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

                </div>
                {(this.state.page === 'home')? <Home web3={this.state.web3}/> :<div></div>}
                {(this.state.page === 'portfolio')? <Portfolio web3={this.state.web3}/> :<div></div>}
                {(this.state.page === 'about')? <About web3={this.state.web3}/> :<div></div>}

            </div>
        );
    }
}

export default App;
