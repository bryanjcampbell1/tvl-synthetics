
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
    //'opium-network',
    //'harvest-finance',
    //'maker',
    'sushiswap',
    'uniswap'
];

exports.updateCharts = functions.pubsub.schedule('every 12 hours').onRun( async (context) => {

    for (let i= 0; i<projectsArray.length; i++) {
        await updateChart(projectsArray[i]);
    }

    await updateRatioChart('sushiswap','uniswap');

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

async function updateRatioChart(project1, project2){

    //get project1 and project2 chart data from firebase
    let project1Ref =  store.collection("Charts").doc(project1);
    let project2Ref =  store.collection("Charts").doc(project2);

    let project1ChartData = [];
    let project2ChartData = [];

    let ratioChartData = [];

    project1Ref.get().then(function(doc) {
        if (doc.exists) {
            //console.log("Document data:", doc.data());
            project1ChartData = doc.data().chartData;

            console.log(`length of 1: ${project1ChartData.length}`);

            project2Ref.get().then(function(doc) {
                if (doc.exists) {
                    //console.log("Document data:", doc.data());
                    project2ChartData = doc.data().chartData;

                    console.log(`length of 2: ${project2ChartData.length}`);

                    for (let i = 0; i < project1ChartData.length; i++) {

                        let time = project1ChartData[i].x;
                        let project1_value = project1ChartData[i].y;

                        //filter project2ChartData to find same time

                        let project2Points = project2ChartData.filter(c => c.x === time);

                        console.log('uin obj matching time');
                        console.log(project2Points);
                        console.log(project2Points[0]);

                        if (project2Points.length !== 0) {
                            let project2Point = project2Points[0];
                            let project2_value = project2Point.y;
                            let ratioOfValues = project1_value / project2_value;

                            let point = {
                                x: moment(0),
                                y: 0
                            };

                            point.x = time;
                            point.y = ratioOfValues;

                            ratioChartData.push(point);
                        }

                    }


                    let docRef = store.collection("Charts").doc(`${project1}-${project2}`);

                    docRef.set({
                        chartData: ratioChartData,
                    }, { merge: true })
                        .catch(function(error) {console.log(error)});


                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

}


