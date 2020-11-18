import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import erc20 from "./apis_abis";
import abis from "./abis";
import addresses from "./addresses";

function RedeemEarly(props) {

    const [amount, setAmount ] = useState(0);


    const approve = async()  =>{
        console.log('inside approve');
        await approveSpend();
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


    const redeemEarly = async() => {

        let emp = new props.web3.eth.Contract(abis.empABI, addresses.empContract);

        await emp.methods.redeem({ rawValue: props.web3.utils.toWei(`${amount}`) }).send({from: props.web3.eth.accounts[0]})
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
                fontSize: 18,
                fontWeight: '600',
                marginTop:20
            }}>Redeem Early</p>

            <div style={{width:'90%'}}>
                <p >Token sponsors can redeem tokens even before the expiration date.</p>
                <Form>
                    <Form.Group controlId="formQuantityRedeem">
                        <Form.Control
                            onChange={(e)=> {setAmount(e.target.value)}}
                            type="quantity"
                            placeholder="Redeem Amount" />
                    </Form.Group>
                </Form>

                <div style={{marginTop: 10}}>
                    <Button
                        onClick={() => { approve() }}
                        style={{width: '100%'}}
                        variant="info"
                    >APPROVE</Button>
                </div>

                <div style={{marginTop: 10}}>
                    <Button
                        onClick={() => { redeemEarly() }}
                        style={{width: '100%'}}
                        variant="info"
                    >REDEEM EARLY</Button>
                </div>
            </div>
        </div>
    );
}

export default RedeemEarly;
