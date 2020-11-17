import React, {useEffect, useState} from 'react';
import {Row, Col, Form,Button} from 'react-bootstrap';

import abis from "./abis.js";
import addresses from "./addresses";



function ManageCollateral(props) {

    const [amount, setAmount] = useState(0);

    const  addCollateral = async() => {

        const fromAddress = (await props.web3.eth.getAccounts())[0];

        let emp = new props.web3.eth.Contract(abis.empABI, addresses.empContract);

        await emp.methods.deposit({ rawValue: props.web3.utils.toWei(`${amount}`) }).send({from: fromAddress})
            .then(function(receipt){
                // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
                console.log(receipt);
            });

    }

    const  requestWithdraw = async() => {

        const fromAddress = (await props.web3.eth.getAccounts())[0];
        let emp = new props.web3.eth.Contract(abis.empABI, addresses.empContract);

        await emp.methods.requestWithdrawal({ rawValue: props.web3.utils.toWei(`${amount}`) }).send({from: fromAddress})
            .then(function(receipt){
                // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
                console.log(receipt);
            });

    }

    const  withdrawAfterLiveness = async() => {

        const fromAddress = (await props.web3.eth.getAccounts())[0];
        let emp = new props.web3.eth.Contract(abis.empABI, addresses.empContract);

        await emp.methods.withdrawPassedRequest().send({from: fromAddress})
            .then(function(receipt){
                // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
                console.log(receipt);
            });

    }

    return(
        <div style={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
        }}>
            <p style={{
                fontSize: 20,
                fontWeight: '600',
                marginTop:20
            }}>Manage Collateral</p>

            <div style={{width:'90%'}}>

                <p style={{
                    fontSize: 16,
                    fontWeight: '500',
                    marginTop:10
                }}>Collateral Type: DAI</p>

                <Form>
                    <Form.Group controlId="formQuantity">
                        <Form.Control
                            onChange={(e)=> {setAmount(e.target.value)}}
                            type="quantity"
                            placeholder="Enter amount" />
                    </Form.Group>
                </Form>
                <div style={{marginTop: 10}}>
                    <Button
                        onClick={() => { addCollateral() }}
                        style={{width: '100%'}}
                        variant="info"
                    >DEPOSIT</Button>

                    <Button
                        onClick={() => { requestWithdraw() }}
                        style={{width: '100%', marginTop: 10}}
                        variant="info"
                    >REQUEST WITHDRAW</Button>
                </div>

            </div>

            <div style={{width:'90%',marginTop:30}}>
                <p style={{
                    fontSize: 16,
                    fontWeight: '500',
                    marginTop:10
                }}>My Collateral Ratio: 1.8</p>

                <p style={{
                    fontSize: 16,
                    fontWeight: '500',
                    marginTop:10
                }}>Minimum Collateral Ratio: 1.5</p>

            </div>

            <div style={{width:'90%', marginTop:20}}>
                <p style={{
                    fontSize: 16,
                    fontWeight: '500',
                }}> In order to "Withdraw" at least 2 hours must have passed since initiating a "Request Withdraw" transaction.</p>

                <Button
                    onClick={() => { withdrawAfterLiveness() }}
                    style={{width: '100%', marginTop: 10}}
                    variant="info"
                >WITHDRAW</Button>
            </div>

        </div>
    );
}

export default ManageCollateral;
