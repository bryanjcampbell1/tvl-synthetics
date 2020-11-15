import {Button, Form} from "react-bootstrap";
import React from "react";

function Mint(props) {

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
                        <Form.Control type="quantity" placeholder="Minting Amount" />
                    </Form.Group>
                </Form>

                <Form>
                    <Form.Group controlId="formQuantityCollateral">
                        <Form.Control type="quantity" placeholder="Collateral Amount" />
                    </Form.Group>
                </Form>

                <div style={{marginTop: 10}}>
                    <Button
                        style={{width: '100%'}}
                        variant="info"
                    >APPROVE</Button>
                </div>

                <div style={{marginTop: 10}}>
                    <Button
                        style={{width: '100%'}}
                        variant="info"
                    >MINT</Button>
                </div>

            </div>


        </div>
    );
}

export default Mint;
