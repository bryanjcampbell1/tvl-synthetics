import React, {useEffect, useState} from 'react';
import {Row, Col, Form,Button} from 'react-bootstrap';
import Main from "./Main";


function Portfolio(props){
    const [project, setProject] = useState("All Projects");

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
                                <p>My Balance</p>
                                <p>100</p>
                            </div>
                            <div style={{
                                display:'flex',
                                flexDirection:"column",
                                alignItems:"center",
                                width:'50%'}}>
                                <p>Minted</p>
                                <p>80</p>
                            </div>
                        </div>

                        <div style={{
                            display:'flex',
                            flexDirection:"column",
                            alignItems:"center",
                            width:'100%',
                        }}>
                            <Button style={button1}>MINT</Button>
                            <Button style={button1}>MANAGE COLLATERAL</Button>
                            <Button style={button1}>REDEEM EARLY</Button>
                            <Button style={button1}>REDEEM EXPIRED</Button>
                        </div>

                    </div>
                    <div style={{
                        width:'60%'
                    }}></div>
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
