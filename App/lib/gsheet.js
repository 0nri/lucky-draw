const {google} = require('googleapis');
const apiKey = require('../conf').googleSheetApiKey;
var sheets = google.sheets('v4');
var gsheet = {};

/**
* Reads the list of values in column A
* The Sheets must be public (or with shareable link enabled)
*/
gsheet.readColumn = function(gSheetId) {
    return new Promise(function(resolve, reject) {
        sheets.spreadsheets.values.get({
            spreadsheetId: gSheetId,
            range: 'A1:A',
            auth: apiKey 
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const rows = res.data.values;
            if (rows.length) {
                var values = [];
                console.log('Values:');
                rows.map((row) => {
                    var val = row[0];
                    values.push(val)
                    console.log(val);
                });
                resolve(values);
            } else {
                console.log('No data found.');
                reject();
            }
        });
    });
};

gsheet.hello = function () {
    console.log("Hi Sheet");
};

module.exports = gsheet;
