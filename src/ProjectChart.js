import React, { useState, useEffect} from 'react';
import './App.css';
import moment from 'moment';

import {Line} from 'react-chartjs-2';
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

    const [graphData, setGraphData] = useState();
    const [tvlUSD, setTvlUSD] = useState("");


    useEffect(() => {
        loadProject(props.project);
    });


    const loadProject = async(e) => {

        let projectName = e.toString();
        if(e == 'Opium Network'){
            projectName = 'opium-network';
        }

        const apiKey = '************************';
        axios.get(`https://data-api.defipulse.com/api/v1/defipulse/api/GetHistory?project=${projectName}&api-key=${apiKey}`)
            .then(function (response) {

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


    return(

        <div>
            <Line data={graphData} options={options}  />
            <p style={{marginTop:20, color:'grey'}}>{`Current TVL: ${tvlUSD}`}</p>
        </div>
    );
}


export default ProjectChart;

