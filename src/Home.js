import React from 'react';
import './App.css';
import {Button,Row,Col} from 'react-bootstrap';
import Main from "./Main";

function Home(props){

    return(
        <div>
            <div style={{textAlign:'center',marginTop:80, height:200}}>
                <p style={{
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontSize: 35,
                    fontVariant: "normal",
                    fontWeight: '900',
                    color:'rgb(22,162,185)'
                }}> Derivatives For Your Favorite DeFi Protocols </p>
            </div>
            <Row>
                <Col xs={0} sm={1} md={2} lg={2}></Col>
                <Col>
                    <Main web3={props.web3} />
                    <div style={{padding:20}}>

                        <div style={{marginTop:100}}>
                            <p style={{fontSize:20,fontWeight:'bold'}}>What is a project's TVL?</p>
                            <p style={{fontSize:18}}>
                                TVL stands for Total Value Locked.  It is a measure of the combined value of deposited assets in a protocol and is often used as a metric to track how successful a platform is.
                            </p>
                        </div>

                        <div style={{marginTop:40}}>
                            <p style={{fontSize:20,fontWeight:'bold'}}>Why do we need derivatives of a project's Total Locked Value?</p>
                            <p style={{fontSize:18}}>
                                While many projects have a native token, speculation is the main driver of token prices.
                                TVL Synths offer a new way to invest in the success of a project, tied to the platform's actual use!
                            </p>
                        </div>

                        <div style={{marginTop:40, marginBottom:300}}>
                            <p style={{fontSize:20,fontWeight:'bold'}}>Are TVL Syths safe?</p>
                            <p style={{fontSize:18}}>
                                Yes.  All derivatives are powered by the UMA protocol audited by  Openzeppelin Security.
                            </p>
                        </div>
                    </div>
                </Col>
                <Col xs={0} sm={1} md={2} lg={2}></Col>
            </Row>
        </div>
    );
}


export default Home;


