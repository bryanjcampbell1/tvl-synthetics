
const functions = require('firebase-functions');
const axios = require('axios');
const moment = require('moment');
moment().format();

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

const store = admin.firestore();

//eventually create addNewArtist method
// artist array will be kept in db and queried for cloud functs

let projectsArray = [
    'all',
    'aave',
    'opium-network',
    'harvest-finance',
    'maker',
    'sushiswap'
];

exports.updateCharts = functions.pubsub.schedule('every 12 hours').onRun( async (context) => {

    for (let i= 0; i<projectsArray.length; i++) {
        await updateChart(projectsArray[i]);
    }
    return null;
});


async function updateChart(projectName){

    let chartData = [];

    const apiKey = '';

    let url = ''

    if(projectName === 'all'){
        url = `https://data-api.defipulse.com/api/v1/defipulse/api/GetHistory?period=1y&api-key=${apiKey}`
    }
    else{
        url = `https://data-api.defipulse.com/api/v1/defipulse/api/GetHistory?project=${projectName}&api-key=${apiKey}`
    }

    const response = await axios.get(url)
    for(let i =0; i < response.data.length; i++){

        let point = {
            x: moment(0),
            y: 0
        };

        point.x = response.data[i].timestamp*1000;
        point.y = response.data[i].tvlUSD;

        chartData.push(point);
    }

    console.log(chartData);

    let docRef = await store.collection("Charts").doc(projectName);

    docRef.set({
        chartData: chartData,
    }, { merge: true })
        .catch(function(error) {console.log(error)});
}
