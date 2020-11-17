import React, {useEffect, useState} from 'react';
import {Form,Button} from 'react-bootstrap';

import Mint from './Mint'
import ManageCollateral from "./ManageCollateral";
import RedeemEarly from "./RedeemEarly";
import RedeemAtExpiration from "./RedeemAtExpiration";


import firebase from './firebase';
import erc20 from "./apis_abis";
require("firebase/firestore");
var db = firebase.firestore();

function Portfolio(props){

    const [synthName, setSynthName] = useState('');
    const [synthAddress, setSynthAddress] = useState('');
    const [synthBalance, setSynthBalance] = useState(0);


    const [action,setAction] = useState();

    const [activeDerivatives,setActiveDerivatives] = useState([]);



    useEffect(() => {

        getProductList();

    },[]);

    useEffect(() => {
        if(props.web3) {
            loadToken();
        }
    },[synthName]);


    const  loadToken = async () => {
        let synth = activeDerivatives.filter(c => c.tokenName === synthName);

        setSynthAddress(synth.tokenAddress);

        const myAddress = (await props.web3.eth.getAccounts())[0];

        const tokenContract = new props.web3.eth.Contract(erc20.abi,"0x514910771af9ca656af840dff83e8264ecf986ca" );


        //setSynthBalance(myBalance);
    }

    const  getProductList = async () => {
        try {

            let derivatives = db.collection("derivatives");
            let products = []

            await derivatives.get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        products.push(doc.data());

                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });

            console.log(products);
            setActiveDerivatives(products);

        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div>
            {
                (props.web3) ?
                <div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div style={box}>
                            <div style={{
                                width: '40%'
                            }}>
                                <div style={{marginTop: -15}}>
                                    <Form>
                                        <Form.Group controlId="currency" style={{marginTop: 15}}>
                                            <Form.Control as="select"
                                                          onChange={(e) => setSynthName(e.target.value)}>
                                                {
                                                    activeDerivatives.map((item) =>
                                                        <option key={item.id}>{item.tokenName}</option>
                                                    )
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </div>

                                <div style={{display: 'flex', width: '100%'}}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: "column",
                                        alignItems: "center",
                                        width: '50%'
                                    }}>
                                        <p style={{
                                            fontSize: 18,
                                            fontWeight: '600',
                                        }}>My Balance</p>
                                        <p style={{
                                            fontSize: 20,
                                            fontWeight: '900',
                                        }}>{synthBalance}</p>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: "column",
                                        alignItems: "center",
                                        width: '50%'
                                    }}>
                                        <p style={{
                                            fontSize: 18,
                                            fontWeight: '600',
                                        }}>Minted</p>
                                        <p style={{
                                            fontSize: 20,
                                            fontWeight: '900',
                                        }}>80</p>
                                    </div>
                                </div>

                                <div style={{
                                    display: 'flex',
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: '100%',
                                }}>
                                    <Button onClick={() => setAction('mint')} style={button1}>MINT</Button>
                                    <Button onClick={() => setAction('manage')} style={button1}>MANAGE
                                        COLLATERAL</Button>
                                    <Button onClick={() => setAction('redeemEarly')} style={button1}>REDEEM
                                        EARLY</Button>
                                    <Button onClick={() => setAction('redeem')} style={button1}>REDEEM EXPIRED</Button>
                                </div>

                            </div>
                            <div style={{
                                width: '60%'
                            }}>
                                <div style={{marginLeft: 40, marginTop: -20}}>
                                    {(action === 'mint') ? <Mint web3={props.web3}/> : <div></div>}
                                    {(action === 'manage') ? <ManageCollateral web3={props.web3}/> : <div></div>}
                                    {(action === 'redeemEarly') ? <RedeemEarly web3={props.web3}/> : <div></div>}
                                    {(action === 'redeem') ? <RedeemAtExpiration web3={props.web3}/> : <div></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{height: 200}}></div>
                </div>
                :
                    <div style={{display: 'flex',justifyContent:'center'}}>
                        <div style={box2}>
                            <p style={{
                                color:'#ff7961',
                                fontSize: 25,
                                fontWeight: '900',}}>Unlock Wallet</p>
                            <p style={{
                                marginTop:-12,
                                color:'#ff7961',
                                fontSize: 25,
                                fontWeight: '900',}}>to </p>
                            <p style={{
                                marginTop:-12,
                                color:'#ff7961',
                                fontSize: 25,
                                fontWeight: '900',}}>Continue</p>
                        </div>
                        <div style={{height: 800}}></div>
                    </div>
            }
        </div>
    );
}

const button1 = {
    marginTop:20,
    width:'90%',
    borderColor:'#ff7961',
    backgroundColor:'#ff7961',
}

const box = {
    width:"70%",
    backgroundColor:'#ffb3b5',
    border:'6px solid #ff7961',
    borderRadius:10,
    padding:20,
    display:'flex',
}

const box2 = {
    width:"40%",
    height:180,
    backgroundColor:'#ffb3b5',
    border:'6px solid #ff7961',
    borderRadius:10,
    padding:20,
    marginTop:80,
    textAlign:'center'
}

export default Portfolio;
