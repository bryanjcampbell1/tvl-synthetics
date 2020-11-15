import React, {useEffect, useState} from 'react';
import {Row, Col, Form,Button} from 'react-bootstrap';




function ManageCollateral(props) {

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
                        <Form.Control type="quantity" placeholder="Enter amount" />
                    </Form.Group>
                </Form>
                <div style={{marginTop: 10}}>
                    <Button
                        style={{width: '100%'}}
                        variant="info"
                    >DEPOSIT</Button>

                    <Button
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

            <div style={{width:'90%', marginTop:30}}>
                <p style={{
                    fontSize: 16,
                    fontWeight: '500',
                    marginTop:10
                }}>Currently Available to Withdaw: 0</p>
                <Form>
                    <Form.Group controlId="formWithdraw">
                        <Form.Control type="quantity" placeholder="Withdraw amount" />
                    </Form.Group>
                </Form>
                <Button
                    style={{width: '100%', marginTop: 10}}
                    variant="info"
                >WITHDRAW</Button>
            </div>

        </div>
    );
}

export default ManageCollateral;
