import React, {useEffect, useState} from 'react';
import './App.css';
import moment from 'moment';
import { Button,Form } from 'react-bootstrap';
import {Line} from 'react-chartjs-2';


const axios = require('axios');



moment().format();


const aaveDerivatives = [
    {  project:"Aave",
        name:'Aave @ $213,244 (10/20/20)',
        expires:'11/20/20 at 5:00 PM EST',
        price:'$21.3244',
        opiumId:'adadtgadgadgadgat'

    },
    {  project:"Aave",
        name:'Aave @ $313,244 (10/20/20)',
        expires:'12/20/20 at 5:00 PM EST',
        price:'$31.3244',
        opiumId:'adadtgadgadgadgat'

    },

];

const opiumDerivatives = [
    {  project:"Opium Network",
        name:'Opium @ $74,244 (10/20/20)',
        expires:'11/20/20 at 5:00 PM EST',
        price:'$74.244',
        opiumId:'adadatbsfbab'

    },
];





function Main(){

    const initialData = {
        labels: [],
        datasets: [
            {
                label: 'Total Value Locked (USD) in Aave',
                fill: false,
                lineTension: 0.0,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [{
                    x: moment(0),
                    y: 0
                }]
            }
        ]
    };

    const options = {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    //unit: 'month'
                    unit: 'quarter'
                },
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value, index, values) {
                        if(parseInt(value) >= 1000000000){
                            const billions = (value/1000000000).toFixed(2);
                            return '$' + billions + " B";
                        }
                        else if(parseInt(value) >= 1000000){
                            const millions = (value/1000000);
                            return '$' + millions + " M";
                        }
                        else if(parseInt(value) >= 1000){
                            const thousands = (value/1000);
                            return '$' + thousands  + " K";
                        }
                        else {
                            return '$' + value;
                        }
                    }
                }
            }]
        }
    }

    const [graphData, setGraphData] = useState(initialData);
    const [tvlUSD, setTvlUSD] = useState("");
    const [derivativesArray, setDerivativesArray] = useState([]);

/*

    useEffect(() => {
        let projectName = 'Aave';
        loadProject(projectName);
    });

*/
    const loadProject = async(e) => {
        console.log(e);

        let projectName = e.toString();

        if(e == 'Opium Network'){

            projectName = 'opium-network';
        }

        loadProjectDerivatives(projectName);

        const apiKey = '*****************';


        axios.get(`https://data-api.defipulse.com/api/v1/defipulse/api/GetHistory?project=${projectName}&api-key=${apiKey`)
            .then(function (response) {
                // handle success
                console.log(response.data);

                let chartData = [];

                for(let i =0; i < response.data.length; i++){

                    let point = {
                        x: moment(0),
                        y: 0
                    };

                    point.x = moment(response.data[i].timestamp*1000);
                    point.y = response.data[i].tvlUSD;

                    chartData.push(point);
                }



                let gData = {
                    labels: [],
                    datasets: [
                        {
                            label: `Total Value Locked (USD) in ${e}`,
                            fill: false,
                            lineTension: 0.0,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: chartData
                        }
                    ]
                }

                setGraphData(gData);


                let lastValue = chartData[0].y;
                let value = '';

                if(parseInt(lastValue) >= 1000){
                    value =  '$' + lastValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                } else {
                    value =  '$' + lastValue;
                }

                setTvlUSD(value);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed


            });


    }

    const loadProjectDerivatives = async(e) => {

        if(e === 'opium-network'){
            setDerivativesArray(opiumDerivatives);
        }
        else{
            setDerivativesArray(aaveDerivatives);
        }



    };


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
                <Line data={graphData} options={options}  />
                <p style={{marginTop:20, color:'grey'}}>{`Current TVL: ${tvlUSD}`}</p>
                <Form>
                    <Form.Group  controlId="currency" style={{marginTop:15}}>
                        <Form.Label>Protocol Name</Form.Label>
                        <Form.Control as="select"
                                      onChange={(e)=> loadProject(e.target.value)}>
                            <option>Aave</option>
                            <option>Opium Network</option>
                        </Form.Control>
                    </Form.Group>
                </Form>

                <p> Derivative Products</p>

                <div >
                    {
                        derivativesArray.map((row, key) =>
                            <div style={box1}>
                                <p style={{color:'slate',fontWeight:'bold', fontSize:22}}>
                                    { 'TVL Synth for ' + row.name }
                                </p>

                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <div style={{textAlign:'start'}}>
                                        <div style={{display:'flex'}}>
                                            <p style={{color:'slate',fontWeight:'bold', fontSize:22}}>Settled On:</p>
                                            <p style={{color:'lightgrey', fontSize:22}}>{row.expires}</p>
                                        </div>
                                        <div style={{display:'flex'}}>
                                            <p style={{color:'slate',fontWeight:'bold', fontSize:22}}>Price:</p>
                                            <p style={{color:'lightgrey', fontSize:22}}>{row.price}</p>
                                        </div>
                                    </div>
                                </div>

                                <p style={{textAlign:'start', margin:30}}>
                                    At expiration, an increase in {row.project} TVL will produce a positive payout for the LONG token holder, paid by the SHORT token holder.
                                    A decrease in TVL will payout in the opposite direction.
                                </p>


                                <p style={{color:'slate',fontWeight:'bold', fontSize:22}}>
                                    GET {row.project.toUpperCase()} TVL SYNTHS!
                                </p>

                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <Button style={{borderColor:'#72bcd4',backgroundColor:'#72bcd4',marginRight:20,width:220}}>LONG</Button>
                                    <Button style={{borderColor:'#72bcd4',backgroundColor:'#72bcd4', marginLeft:20,width:220}}>SHORT</Button>
                                </div>

                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
const box1 = {
    width:'100%',
    backgroundColor:'#ff7961',
    borderRadius:50,
    padding:30,
    marginTop:20,

}

export default Main;

