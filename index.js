'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

//Database Connection
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'ws://DATABASEURL'
});

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
 function handleLocation(agent){
     const sentLocation = agent.parameters.location;
     agent.add('Thank You...');

      return admin.database().ref('BROADNAME').transaction((location) => {
      if(location !== null) {
        let newLocation = sentLocation;
        location.country = newLocation;
        
        agent.add(`Viewing ` + newLocation + ' on Liquid Galaxy');
      }
      return location;
    }, function(error, isSuccess) {
      console.log('Added Location to Database: ' + isSuccess);
    });
 }

  let intentMap = new Map();
  intentMap.set('NAMEOFINTENT', handleLocation);
  
 
  agent.handleRequest(intentMap);
});
