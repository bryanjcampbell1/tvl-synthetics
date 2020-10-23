import React, {useEffect, useState} from 'react';

import { Button,Form } from 'react-bootstrap';

import './App.css';




let erc20 = {
    "abi": [
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_from",
                    "type": "address"
                },
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_owner",
                    "type": "address"
                },
                {
                    "name": "_spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "payable": true,
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        }
    ]
}




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

    const  submitOrder = async() => {
        setSubmitState(3);

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
                        <Button variant="info"  onClick={() => {
                                                setScreen(1);
                                                setType('long')
                                            }
                                        }
                        >LONG</Button>
                    </div>
                    <br/>
                    <div>
                        <Button variant="info"  onClick={() => {
                                                setScreen(1);
                                                setType('long')
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
                        <Button style={{marginTop:-10}} onClick={() => setScreen(2)}>Back</Button>
                    </div>
                    <p style={{marginTop:-45}} >Order Details</p>
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
                                    <Button onClick={submitOrder}
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
    borderRadius:50,
    padding:30,
    marginTop:20,
}



export default SynthProduct;
/*
{(() => {
                                switch (submitState) {
                                    case 0:
                                        return(
                                            <div>
                                                <Button onClick={() => approve}
                                                        variant="info"
                                                        size="lg"
                                                        style={{width:'50%'}}>
                                                    Approve
                                                </Button>
                                                <br/>
                                                <Button variant="outline-light"  size="lg" style={{width:'50%'}} disabled>
                                                    Submit Order
                                                </Button>
                                            </div>
                                        );
                                    case 1:
                                        return(
                                            <div>
                                            <Button className="Waiting"
                                                       variant="info"
                                                       size="lg"
                                                       style={{width:'50%'}}>
                                            Approve
                                        </Button>
                                        <br/>
                                        <Button variant="outline-light"  size="lg" style={{width:'50%'}} disabled>
                                            Submit Order
                                        </Button>
                                            </div>
                                    );
                                    case 2:
                                        return(
                                            <div>
                                                <Button variant="outline-light"  size="lg" style={{width:'50%'}} disabled>
                                                    Approve
                                                </Button>
                                                <br/>
                                                <Button onClick={() => approve}
                                                        variant="info"
                                                        size="lg"
                                                        style={{width:'50%'}}>
                                                    Submit Order
                                                </Button>
                                            </div>
                                    );
                                    case 3:
                                        return(
                                            <div>
                                                <Button variant="outline-light"  size="lg" style={{width:'50%'}} disabled>
                                                    Approve
                                                </Button>
                                                <br/>
                                                <Button className="Waiting"
                                                        variant="info"
                                                        size="lg"
                                                        style={{width:'50%'}}>
                                                    Submit Order
                                                </Button>
                                            </div>
                                        );
                                    default:
                                        return null;
                                }
                            })()}
 */