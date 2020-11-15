import React, {useEffect, useState} from 'react';
import {Row, Col, Form,Button} from 'react-bootstrap';


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

            <div style={{width:'90%'}}>

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

function RedeemAtExpiration(props) {

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
            }}>Redeem Expired</p>


            <p style={{width:'80%'}}>The easiest way to redeem is via UMA's EMP Tools. Check out the tutorial for more info!</p>

            <Button
                style={{marginTop:20,width:'80%'}}
                href="http://tools.umaproject.org/"
                variant="info"
            >Take Me To EMP Tools!</Button>

            <Button
                style={{marginTop:10,width:'80%'}}
                href="https://docs.umaproject.org/tutorials/redeem-tokens"
                variant="info"
            >Tutorial</Button>

        </div>
    );
}

function Portfolio(props){
    const [project, setProject] = useState("All Projects");
    const [action,setAction] = useState();

    return(
        <div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <div style={box}>
                    <div style={{
                        width:'40%'
                    }}>
                        <div style={{marginTop:-15}}>
                            <Form>
                                <Form.Group  controlId="currency" style={{marginTop:15}}>
                                    <Form.Control as="select"
                                                  onChange={(e)=> setProject(e.target.value)}>
                                        <option>AllProjectsTVL - NOV</option>
                                        <option>AaveTVL - NOV</option>
                                        <option>OpiumNetwork - NOV</option>
                                        <option>MakerTVL - DEC</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </div>

                        <div style={{display:'flex', width:'100%'}}>
                            <div style={{
                                display:'flex',
                                flexDirection:"column",
                                alignItems:"center",
                                width:'50%'}}>
                                <p style={{fontSize: 18,
                                    fontWeight: '600',
                                }}>My Balance</p>
                                <p style={{fontSize: 20,
                                    fontWeight: '900',
                                }}>100</p>
                            </div>
                            <div style={{
                                display:'flex',
                                flexDirection:"column",
                                alignItems:"center",
                                width:'50%'}}>
                                <p style={{fontSize: 18,
                                    fontWeight: '600',
                                }}>Minted</p>
                                <p style={{fontSize: 20,
                                    fontWeight: '900',
                                }}>80</p>
                            </div>
                        </div>

                        <div style={{
                            display:'flex',
                            flexDirection:"column",
                            alignItems:"center",
                            width:'100%',
                        }}>
                            <Button onClick={() => setAction('mint')} style={button1}>MINT</Button>
                            <Button onClick={() => setAction('manage')} style={button1}>MANAGE COLLATERAL</Button>
                            <Button onClick={() => setAction('redeemEarly')} style={button1}>REDEEM EARLY</Button>
                            <Button onClick={() => setAction('redeem')} style={button1}>REDEEM EXPIRED</Button>
                        </div>

                    </div>
                    <div style={{
                        width:'60%'
                    }}>
                        <div style={{marginLeft:40,marginTop:-20}}>
                            {(action === 'mint')? <Mint/> : <div></div>}
                            {(action === 'manage')? <ManageCollateral/> : <div></div>}
                            {(action === 'redeemEarly')? <RedeemEarly/> : <div></div>}
                            {(action === 'redeem')? <RedeemAtExpiration/> : <div></div>}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{height:200}}></div>
        </div>
    );
}

const box = {
    width:"70%",
    backgroundColor:'#ffb3b5',
    border:'6px solid #ff7961',
    borderRadius:10,
    padding:20,
    display:'flex',
}

const button1 = {
    marginTop:20,
    width:'90%',
    borderColor:'#ff7961',
    backgroundColor:'#ff7961',
}

export default Portfolio;
