import React, {useState} from 'react';
import './App.css';
import {Row, Col, Form} from 'react-bootstrap';

import ProjectChart from "./ProjectChart";
import SynthProduct from './SynthProduct';




const derivativesArray = [
    {  project:"Aave",
        tvl:'$213,244',
        expires:'11/20/20 at 5:00 PM EST',
        price:'21.3244',
        opiumId:'adadtgadgadgadgat',
        currency: "0xb16f2a1cebE5D195a7e3b1D5B5fecd30820E894a",//DAI
        currencyName:"DAI",
        description:"At expiration the break even value of TVL in USD is $213,244. Any increase in TVL will result in a positive payout to the holder of the long token, " +
            "payed by the short token holder.  A decrease in TVL will result in a payout in the opposite direction. " +
            "Payout value is proportional to the percent change in TVL, with a maximum payout of 2 times collateral when the TVL changes by 100%. "+
            "Orders are matched and payouts are managed via the Opium Exchange protocol. "+
            "Defipulse data is used as the price feed for derivative settlement."
    },
    {  project:"Opium Network",
        tvl:'$74,244',
        expires:'11/20/20 at 5:00 PM EST',
        price:'74.244',
        opiumId:'adadatbsfbab',
        currency: "0xb16f2a1cebE5D195a7e3b1D5B5fecd30820E894a",//DAI
        currencyName:"DAI",
        description:"At expiration the break even value of TVL in USD is $74,244. " +
            "Any increase in TVL will result in a positive payout to the holder of the Long token," +
            "payed by the Short token holder.  A decrease in TVL will result in a payout in the opposite direction." +
            "Payout value is proportional to the percent change in TVL, with a maximum payout of 2 times collateral when the TVL changes by 100%.  "+
            "Orders are matched and payouts are managed via the Opium Exchange protocol."+
            "Defipulse data is used as the price feed for derivative settlement."
    }
];


function Main(props){
    const base = props.base;

    const [project, setProject] = useState("Aave");

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

                <ProjectChart project={project}  />

                <Form>
                    <Form.Group  controlId="currency" style={{marginTop:15}}>
                        <Form.Label>Protocol Name</Form.Label>
                        <Form.Control as="select"
                                      onChange={(e)=> setProject(e.target.value)}>
                            <option>Aave</option>
                            <option>Opium Network</option>
                        </Form.Control>
                    </Form.Group>
                </Form>

                <p> Derivative Products</p>

                <Row>
                    <Col xs={0} sm={1} md={2} lg={2} ></Col>
                    <Col>
                        <div >
                            {
                                derivativesArray
                                    .filter(i => (i.project === project) )
                                    .map((row, key) =>
                                        <SynthProduct project={row.project}
                                                      tvl={row.tvl}
                                                      expires={row.expires}
                                                      price={row.price}
                                                      opiumID={row.opiumId}
                                                      currency={row.currency}
                                                      currencyName={row.currencyName}
                                                      base={base}
                                                      web3={props.web3}
                                                      authSignature={props.authSignature}
                                                      description={row.description}
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

