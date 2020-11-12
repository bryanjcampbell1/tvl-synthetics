import React, {useState} from 'react';

import { Button,Form } from 'react-bootstrap';
import {ChevronLeft,DashCircle,PlusCircle} from 'react-bootstrap-icons';
import './App.css';
import erc20 from "./apis_abis";
const axios = require('axios');



function UMASynth(props){

    const [screen, setScreen] = useState(0);
    const [submitState, setSubmitState] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [type, setType] = useState();
    const [moreDetails, setMoreDetails] = useState(0);
    const [warning, setWarning] = useState("");


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


    return (
        <div style={box1}>

            <p>{props.tokenName}</p>
            <hr/>

            <p style={{color:'grey', fontSize:40, fontWeight:900}}>$83.58</p>
            <p>Price if Settled Today</p>



            <div>
                <Button variant="info"
                        style={{width:300}}
                >BUY / SELL</Button>
            </div>
            <br/>
            <div>
                <Button variant="info"
                        style={{width:300}}
                >MINT</Button>
            </div>
            <br/>
            <div>
                <Button variant="info"
                        style={{width:300}}
                >PROVIDE LIQUIDITY</Button>
            </div>
            <div style={{display:'flex', justifyContent:'center'}}>
            <div style={{width:300, marginTop:20}}>
            {
                (moreDetails)?
                    <div>
                        <div style={{display:'flex', justifyContent:'flex start'}}>
                            <DashCircle style={{marginTop:5}} onClick={() => setMoreDetails(0)}/>
                            <p  style={{marginLeft:6}} onClick={() => setMoreDetails(0)}>Details</p>
                        </div>
                        <div  style={{textAlign:'start'}}>
                            <p>{props.description}</p>
                        </div>
                    </div>
                    :
                    <div>
                        <div style={{display:'flex', justifyContent:'flex start'}}>
                            <PlusCircle style={{ marginTop:5}} onClick={() => setMoreDetails(1)}/>
                            <p style={{marginLeft:6}} onClick={() => setMoreDetails(1)}>Details</p>
                        </div>
                    </div>

            }
            </div>
                </div>
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



export default UMASynth;
