import React, {useEffect, useState} from 'react';
import './App.css';
import { Button,Form } from 'react-bootstrap';

import ProjectChart from "./ProjectChart";
import SynthProduct from './SynthProduct';


const derivativesArray = [
    {  project:"Aave",
        tvl:'$213,244',
        expires:'11/20/20 at 5:00 PM EST',
        price:'21.3244',
        opiumId:'adadtgadgadgadgat'

    },
    {  project:"Aave",
        tvl:'$313,244',
        expires:'12/20/20 at 5:00 PM EST',
        price:'31.3244',
        opiumId:'adadtgadgadgadgat'
    },
    {  project:"Opium Network",
        tvl:'$74,244',
        expires:'11/20/20 at 5:00 PM EST',
        price:'74.244',
        opiumId:'adadatbsfbab'

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
                width:'60%',
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
                                          base={base}
                                          web3={props.web3}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
}


export default Main;

