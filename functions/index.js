var functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const rp = require('request-promise');
const moment = require('moment');
const ERROR_DICTIONARY_REF = 'https://script.google.com/macros/s/AKfycbzUstOklUmuXrgvQAoETCDst3sDfE3d6Re22iXM9LWzTkPPHFQ/exec?id=1-iK9vwAbOYumhWdvwZjO1U8AUxi9WGsP32rKAkZ4wTQ';

// Log Sts Operations Endpoint
exports.logStsOperations = functions.https.onRequest((req, res) => {
  if (req.method === 'GET') {
    if (req.query) {
      var enviroment = req.query.env || 'dev';

      var preparedData = {
        asset: req.query.asset,
        contNum: req.query.contNum,
        category: req.query.category,
        start: req.query.start,
        end: req.query.end,
        timeStamp: admin.database.ServerValue.TIMESTAMP
      }

      preparedData.duration = moment(req.query.end, 'YYYY-MM-DD HH:mm:ss').diff(moment(req.query.start, 'YYYY-MM-DD HH:mm:ss'), 'seconds') || 0;

      admin.database().ref(enviroment + '/logs/stsOperations').push(preparedData)
        .catch(error => console.log(`error when trying write to db: ${error.message}, <${preparedData.asset}, ${preparedData.contNum}, ${preparedData.start}>`));
      res.end();
    }
  } else {
    res.status(403).send('Bad request!');
  }
});

// Log Sts Error Endpoint
exports.logStsErrors = functions.https.onRequest((req, res) => {
  if (req.method === 'GET') {
    if (req.query) {
      var enviroment = req.query.env || 'dev';

      var preparedData = {
        asset: req.query.asset,
        code: req.query.code,
        category: req.query.category,
        description: req.query.description,
        dateRef: req.query.dateRef,
        currentLoad: +req.query.currentLoad,
        timeStamp: admin.database.ServerValue.TIMESTAMP
      }

      admin.database().ref(enviroment + '/logs/stsErrors').push(preparedData)
        .catch(error => console.log(`error when trying write to db: ${error.message}, <${preparedData.asset}, ${preparedData.contNum}, ${preparedData.start}>`));
      res.end();
    }
  } else {
    res.status(403).send('Bad request!');
  }
});

// Log Rtg Error Endpoint
exports.logRtgErrors = functions.https.onRequest((req, res) => {
  if (req.method === 'GET') {
    if (req.query) {
      var enviroment = req.query.env || 'dev';

      var preparedData = {
        asset: req.query.asset,
        code: req.query.code,
        category: req.query.category,
        description: req.query.description,
        dateRef: req.query.dateRef,
        currentLoad: +req.query.currentLoad,

        posBay: +req.query.posBay,
        posRow: +req.query.posRow,
        posTie: +req.query.posTie,
        posLat: +req.query.posLat,
        postLong: +req.query.postLong,

        timeStamp: admin.database.ServerValue.TIMESTAMP
      }

      admin.database().ref(enviroment + '/logs/rtgErrors').push(preparedData)
        .catch(error => console.log(`error when trying write to db: ${error.message}, <${preparedData.asset}, ${preparedData.contNum}, ${preparedData.start}>`));
      res.end();
    }
  } else {
    res.status(403).send('Bad request!');
  }
});

// Sync Sts Error Dictionary
exports.syncStsErrorDictionary = functions.https.onRequest((req, res) => {
  const secret = req.query.secret;

  if (secret !== 'w33d') {
    console.log('Wrong secret key: ', secret);
    res.status(403).send('Bad request!');
    return;
  }

  const sheetName = 'rtgErrorsRef'
  const options = {
    method: 'GET',
    uri: ERROR_DICTIONARY_REF + '&sheet=' + sheetName,
    json: true
  }

  return rp(options)
    .then(resp => {
      if (resp[sheetName] && resp[sheetName].length) {
        let preparedDict = resolveDictionary(resp[sheetName]);

        
        console.log('respond: ', resolveDictionary(resp[sheetName]));
        res.send(resp[sheetName]);
      } else {
        res.status(404).send('Data not found.');
      }
    });

});

// resolve dictionary before set to Firebase
function resolveDictionary(rawData) {
  let result = {};

  if (Array.isArray(rawData) && rawData.length) {
    rawData.forEach((item) => {
      if (item['code'] && item['description']) {
        result[item['code']] = item['description'];
      }
    });
  }

  return result;
}

// Get Endpoint Return data for googleSheets
exports.extractOperationLogs = functions.https.onRequest((req, res) => {
  if (req.method === 'GET') {
    if (req.query) {
      var enviroment = req.query.env || 'dev';
      var from = req.query.from || '2017-04-10 14:55:00';
      var to = req.query.to || '2017-04-10 14:59:00';

      admin.database().ref(enviroment + '/logs/stsOperations')
        .orderByChild('start')
        .startAt(from)
        .endAt(to)
        .limitToFirst(5000000)
        .once('value')
        .then(snap => res.json(snap.val()))
        .catch(error => {
          res.json([]);
          console.log(`error when trying read to db: ${error.message}`);
        });
    }
  } else {
    res.status(403).send('Bad request!');
  }
});