//problem -
//changing the dropdown on Main does not trigger loadProject




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

        console.log("inside")

        let projectName = e.toString();
        if(e == 'Opium Network'){
            projectName = 'opium-network';
        }

        console.log("project name")
        console.log(projectName)


        const apiKey = '********************';
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

/*
class ProjectChart extends React.Component {

    constructor(props) {
        super(props);

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

        const graphData = {
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
        }

        this.state = {
            options: options,
            graphData: graphData,
            tvlUSD:"",
        }


    }

    componentDidMount(){
        console.log("project");
        console.log(this.props.project);

        this.loadProject(this.props.project);

    }




    async loadProject(e){

        let that = this;


        let projectName = e.toString();

        console.log(projectName);





        if(e == 'Opium Network'){
            projectName = 'opium-network';
        }

        const apiKey = '8544ba0d808ef5ad5154ff4cc507a49f07ca27aca6c333adc2ec14a291e8';
        //const apiKey = '***********************';
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

                that.setState({graphData:gData});


                let lastValue = chartData[0].y;
                let value = '';

                if(parseInt(lastValue) >= 1000){
                    value =  '$' + lastValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                } else {
                    value =  '$' + lastValue;
                }

                that.setState({tvlUSD:value});


            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed


            });


    }

    render() {
        return(

            <div>
                <Line data={this.state.graphData} options={this.state.options}  />
                <p style={{marginTop:20, color:'grey'}}>{`Current TVL: ${this.state.tvlUSD}`}</p>
            </div>
        );
    }


}



/*
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
    },[]);


    const loadProject = async(e) => {

        let projectName = e.toString();
        if(e == 'Opium Network'){
            projectName = 'opium-network';
        }

        const apiKey = '8544ba0d808ef5ad5154ff4cc507a49f07ca27aca6c333adc2ec14a291e8';
        //const apiKey = '***********************';
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
*/

//export default ProjectChart;

