import React, {useState} from 'react';

import { Button,Form } from 'react-bootstrap';
import {ChevronLeft} from 'react-bootstrap-icons';

import './App.css';
import erc20 from "./apis_abis";

const axios = require('axios');



function SynthProduct(props){

    const base = props.base;

    const [screen, setScreen] = useState(0);
    const [submitState, setSubmitState] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [type, setType] = useState();


    const approve = async()  =>{
        setSubmitState(1);
        await approveSpend();
        setSubmitState(2);
    }

    const  approveSpend= async() => {

        const fromAddress = (await props.web3.eth.getAccounts())[0];

        // Instantiate contract
        const tokenContract = new props.web3.eth.Contract(erc20.abi,"0xb16f2a1cebE5D195a7e3b1D5B5fecd30820E894a" );
        const toAddress = "0xE39b9D5dC766102181D4C5Cd7df1691565B52032";

        // Calculate contract compatible value for approve with proper decimal points using BigNumber
        const tokenDecimals = props.web3.utils.toBN(18);
        const tokenAmountToApprove = props.web3.utils.toBN(999000000000);
        const calculatedApproveValue = props.web3.utils.toHex(tokenAmountToApprove.mul(props.web3.utils.toBN(10).pow(tokenDecimals)));

        await tokenContract.methods.approve(
            toAddress,
            calculatedApproveValue
        ).send({from: fromAddress})
    }

    const  submit = async() => {

        setSubmitState(3);
        await formOrder();
        setScreen(2);
        setSubmitState(0);

    }

    const  formOrder = async() => {

        const fromAddress = (await this.state.web3.eth.getAccounts())[0];

        let body = {
            "ticker": props.opiumID,
            "price": props.price, //how include 10^18 decimals?
            "quantity": quantity,
            "currency": props.currency,
            "action": type,
            "expiresAt": props.expires
        }

        axios
            .post(base + `orderbook/formOrder?authAddress=${fromAddress}`, body, {
                headers: {
                    Authorization: `Bearer ${props.authSignature}`
                }
            })
            .then(response => {
                console.log(response.data)
                signOrder(response.data[0].orderToSign,response.data[0].id)

            })

    }

    async function signOrder(orderMessage,id){
        console.log("order message ", orderMessage)
        //console.log("signed order message ", await signMessage(orderMessage))


        const fromAddress = (await this.state.web3.eth.getAccounts())[0];

        const method = "eth_signTypedData_v3";

        await props.web3.currentProvider.sendAsync({
                id: 1,
                method: method,
                params: [fromAddress, JSON.stringify(orderMessage)],
            },
            (err, result) => {
                if (err) {
                    return console.error(err);
                }
                const signature = result.result;


                console.log("signed order message ", signature)
                submitOrder(signature,id)

            });

    }

    async function submitOrder(signedOrderMessage,id){

        const fromAddress = (await props.web3.eth.getAccounts())[0];

        let body = [{
            id:id,
            signature:signedOrderMessage
        }]

        axios
            .post(base + `orderbook/orders?authAddress=${fromAddress}`, body, {
                headers: {
                    Authorization: `Bearer ${props.authSignature}`
                }
            })
            .then(response => {
                console.log(response.data)

            })
    }


    return (
        <div>
            {(screen === 0)?
                <div style={box1}>

                    <p>{props.project} TVL @ {props.tvl}</p>
                    <hr/>
                    <div style={{display:'flex'}}>
                        <p>Price:{' '}</p>
                        <p>$ {props.price}</p>
                    </div>
                    <div style={{display:'flex'}}>
                        <p>Expires:{' '}</p>
                        <p>{props.expires}</p>
                    </div>
                    <hr/>
                    <p style={{textAlign:'start'}} >Details</p>
                    <hr/>
                    <Form style={{textAlign:'start'}}>
                        <Form.Group controlId="formQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control placeholder="" onChange={(e)=> {setQuantity(e.target.value)}}/>
                            <Form.Text className="text-muted">
                                Collateral to lock {quantity*Number(props.price)} USDC
                            </Form.Text>
                        </Form.Group>
                    </Form>
                    <div>
                        <Button variant="info"
                                style={{width:200}}
                                onClick={() => {
                                                setScreen(1);
                                                setType('ASK');
                                            }
                                        }
                        >LONG</Button>
                    </div>
                    <br/>
                    <div>
                        <Button variant="info"
                                style={{width:200}}
                                onClick={() => {
                                                setScreen(1);
                                                setType('BID');
                                            }
                                        }
                        >SHORT</Button>
                    </div>
                </div>
                :
                <div></div>
            }
            {(screen === 1)?
                <div style={box1}>
                    <div style={{display:'flex', flexDirection:'flex-start'}}>
                        <ChevronLeft color="slate" size={20} onClick={() => setScreen(0)}/>
                    </div>
                    <p style={{marginTop:-20}} >Order Details</p>
                    <hr/>
                    <p>{props.project} TVL @ {props.tvl}</p>
                    <div style={{display:'flex'}}>
                        <p>Quantity:{' '}</p>
                        <p>{quantity}</p>
                    </div>
                    <div style={{display:'flex'}}>
                        <p>Collateral:{' '}</p>
                        <p>$ {quantity*Number(props.price)}</p>
                    </div>
                    <div style={{display:'flex'}}>
                        <p>Max Payout:{' '}</p>
                        <p>{2*quantity*Number(props.price)}</p>
                    </div>

                    <div style={{marginTop: 20}}>
                        {
                            (submitState === 0) ?
                                <div>
                                    <Button onClick={() => { approve() } }
                                            variant="info"
                                            size="lg"
                                            style={{width:'50%'}}>

                                        Approve
                                    </Button>
                                    <br/>
                                    <Button variant="outline-light"  size="lg" style={{width:'50%', marginTop:20}} disabled>
                                    Submit Order
                                    </Button>
                                </div>
                            :
                            <div></div>
                        }
                        {
                            (submitState === 1) ?
                                <div>
                                    <Button className="Waiting"
                                            variant="info"
                                            size="lg"
                                            style={{width:'50%'}}>
                                        Approve
                                    </Button>
                                    <br/>
                                    <Button variant="outline-light"  size="lg" style={{width:'50%', marginTop:20}} disabled>
                                    Submit Order
                                    </Button>
                                </div>
                            :
                            <div></div>
                        }
                        {
                            (submitState === 2) ?
                                <div>
                                    <Button variant="outline-light"  size="lg" style={{width:'50%'}} disabled>
                                    Approve
                                    </Button>
                                    <br/>
                                    <Button onClick={submit}
                                            variant="info"
                                            size="lg"
                                            style={{width:'50%', marginTop:20}}>
                                    Submit Order
                                    </Button>
                                </div>
                                :
                                <div></div>
                        }
                        {
                            (submitState === 3) ?
                                <div>
                                    <Button variant="outline-light"  size="lg" style={{width:'50%'}} disabled>
                                        Approve
                                    </Button>
                                    <br/>
                                    <Button className="Waiting"
                                            variant="info"
                                            size="lg"
                                            style={{width:'50%', marginTop:20}}>
                                        Submit Order
                                    </Button>
                                </div>
                                :
                                <div></div>
                        }

                    </div>
                </div>
                :
                <div></div>
            }
            {(screen === 2) ?
                <div style={box1}>
                    <p>Order Confirmation</p>
                    <hr/>
                    <div>
                        <p style={{textAlign:'start'}}>
                            Congratulations! You submitted an order for {quantity} {props.project} TVL synthetic derivative tokens
                        </p>
                        <br/>
                        <div style={{display:'flex', justifyContent:'start'}}>
                            <p>Visit</p>
                            <div style={{marginLeft:10, marginRight:10,}}>
                                <a href="https://trade.opium.exchange">Opium Exchange</a>
                            </div>
                            <p>to check your order status or cancel your order</p>
                        </div>
                    </div>
                    <br/>
                    <div>
                        <Button style={{width:200, backgroundColor:'rgb(114,188,212)', borderColor:'rgb(114,188,212)'}} onClick={() => {
                            setScreen(1);
                            setQuantity(0);
                        }
                        }
                        >Done</Button>
                    </div>
                </div>
                :
                <div></div>
            }
        </div>
    );
}



const box1 = {
    width:'100%',
    backgroundColor:'#ff7961',
    borderRadius:10,
    padding:30,
    marginTop:20,
}



export default SynthProduct;
