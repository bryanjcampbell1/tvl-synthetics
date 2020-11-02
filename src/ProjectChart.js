import React, { useState, useEffect} from 'react';
import './App.css';
import moment from 'moment';

import {Line} from 'react-chartjs-2';

import firebase from './firebase';
require("firebase/firestore");

var db = firebase.firestore();

const axios = require('axios');

moment().format();

function ProjectChart(props){

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

    const [graphData, setGraphData] = useState({
        labels: [],
        datasets: [
            {
                label: `Total Value Locked (USD)`,
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
    });
    const [tvlUSD, setTvlUSD] = useState("");

    useEffect(() => {
        loadProject(props.project);
    },[props.project]);


    const loadProject = async(e) => {

        let projectName = e.toString();

        if(e === 'Aave'){
            projectName = 'aave';
        }
        else if(e === 'Opium Network'){
            projectName = 'opium-network';
        }
        else if(e === 'Maker'){
            projectName = 'maker';
        }



        let chart = db.collection("Charts").doc(projectName);

        chart.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());

                let c = [];

                for(let i =0; i < doc.data().chartData.length; i++){

                    let point = {
                        x: moment(0),
                        y: 0
                    };

                    point.x = moment(doc.data().chartData[i].x);
                    point.y = doc.data().chartData[i].y;

                    c.push(point);
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
                            data: c
                        }
                    ]
                }

                setGraphData(gData);

                let lastValue = doc.data().chartData[0].y;
                console.log('lastValue');
                console.log(lastValue);

                let value = '';


                if(parseInt(lastValue) >= 1000){
                    value =  '$' + lastValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                } else {
                    value =  '$' + lastValue;
                }

                setTvlUSD(value);

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    }


    return(
        <div>
            <Line data={graphData} options={options}  />
            <p style={{marginTop:20, color:'grey'}}>{`Current TVL: ${tvlUSD}`}</p>
        </div>
    );
}

export default ProjectChart;
