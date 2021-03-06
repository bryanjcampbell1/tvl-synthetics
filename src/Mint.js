import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import erc20 from "./apis_abis";
import abis from "./abis.js";
import addresses from "./addresses";

function Mint(props) {

    const [mintAmount, setMintAmount ] = useState(0);
    const [collateralAmount, setCollateralAmount] = useState(0);


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

    const  sponsorShares= async() => {

        const fromAddress = (await props.web3.eth.getAccounts())[0];
        let empContract = new props.web3.eth.Contract(abis.empABI, addresses.empContract);

        await empContract.methods.create(
            { rawValue: props.web3.utils.toWei(collateralAmount.toString() ) },
            { rawValue: props.web3.utils.toWei(mintAmount.toString() ) }
            ).send({from: fromAddress})
            .then(function(receipt){
                // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
            });
    }

    return(
        <div style={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
        }}>
            <p style={{fontSize: 18,
                fontWeight: '600',
                margin:20
            }}>Mint Tokens</p>

            <div style={{width:'90%', textAlign:'start'}}>

                <p style={{
                    fontSize: 16,
                    fontWeight: '500',
                    marginTop:10
                }}>Collateral Type: DAI</p>
                <p style={{
                    fontSize: 16,
                    fontWeight: '500',
                    marginTop:10
                }}>Minimum Collateral Ratio: 1.5</p>

                <Form>
                    <Form.Group controlId="formQuantityMint">
                        <Form.Control
                            onChange={(e)=> {setMintAmount(e.target.value)}}
                            type="quantity"
                            placeholder="Minting Amount" />
                    </Form.Group>
                </Form>

                <Form>
                    <Form.Group controlId="formQuantityCollateral">
                        <Form.Control
                            onChange={(e)=> {setCollateralAmount(e.target.value)}}
                            type="quantity"
                            placeholder="Collateral Amount" />
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
                        onClick={() => { sponsorShares() }}
                        style={{width: '100%'}}
                        variant="info"
                    >MINT</Button>
                </div>

            </div>


        </div>
    );
}

export default Mint;
