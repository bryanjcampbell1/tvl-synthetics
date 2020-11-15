import {Button, Form} from "react-bootstrap";
import React from "react";

function RedeemEarly(props) {

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
                <p >Token sponsors can redeem tokens even before the expiration date. Redeeming tokens will drop your minted balance.</p>


                <Form>
                    <Form.Group controlId="formQuantityRedeem">
                        <Form.Control type="quantity" placeholder="Redeem Amount" />
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
                    >REDEEM EARLY</Button>
                </div>



            </div>
        </div>
    );
}

export default RedeemEarly;
