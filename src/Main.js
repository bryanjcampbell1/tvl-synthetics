import React, {useEffect, useState} from 'react';
import './App.css';
import {Row, Col, Form} from 'react-bootstrap';

import ProjectChart from "./ProjectChart";

import firebase from './firebase';
import UMASynth from "./UMASynth";
require("firebase/firestore");
var db = firebase.firestore();


function Main(props){

    const [project, setProject] = useState("All Projects");
    const [activeDerivatives,setActiveDerivatives] = useState([]);

    const [currentValue, setCurrentValue] = useState();


    useEffect(() => {
        getProductList();
    },[]);


    const  getProductList = async () => {
        try {

            let derivatives = db.collection("derivatives");
            let products = []

            await derivatives.get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                        products.push(doc.data());

                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });

            console.log(products);
            setActiveDerivatives(products);

        } catch (error) {
            console.error(error);
        }
    }

    return(

        <div style={{
            display:'flex',
            justifyContent:'center',
        }}>
            <div style={{
                padding:20,
                width:'95%',
                textAlign:'center'
            }}>

                <ProjectChart project={project}  currentVal={ (e) => setCurrentValue(e) }/>

                <Form>
                    <Form.Group  controlId="currency" style={{marginTop:15}}>
                        <Form.Control as="select"
                                      onChange={(e)=> setProject(e.target.value)}>
                            <option>All Projects</option>
                            <option>Aave</option>
                            <option>Sushi Uni TVL Ratio</option>
                        </Form.Control>
                    </Form.Group>
                </Form>

                <Row style={{marginTop:40}}>
                    <Col xs={0} sm={1} md={2} lg={2} ></Col>
                    <Col>
                        <div >
                            {
                                activeDerivatives
                                    .filter(i => (i.project === project) )
                                    .map((row, key) =>
                                        <UMASynth project={row.project}
                                                  tokenName={row.tokenName}
                                                  tokenAddress={row.tokenAddress}
                                                  expires={row.expires}
                                                  collateralToken={row.collateralToken}
                                                  collateralAddress={row.collateralAddress}
                                                  web3={props.web3}
                                                  description={row.description}
                                                  currentPrice={currentValue}
                                                  multiplyBy={Number(row.multiplyFactor)}
                                                  divideBy={Number(row.divideFactor)}
                                        />
                                    )
                            }
                        </div>
                    </Col>
                    <Col xs={0} sm={1} md={2} lg={2} ></Col>
                </Row>
            </div>
        </div>
    );
}


export default Main;

