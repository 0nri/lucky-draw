var express = require('express'),
    router = express.Router(),
    candidates = require('../conf').preloadCandidates,
    isWithoutReplacement = true,
    _ = require('lodash'),
    io = require('../lib/io')
    gsheet = require('../lib/gsheet');

router.post("/addCandidate", function(req, res) {
    var val = req.param('candidate');
    if (val && val !== "") {
        candidates.push(val);
        boardcastCandidates();
    }
    res.end();
});

router.post('/removeCandidate', function(req, res) {
    var val = req.param('candidate');
    candidates = _.without(candidates, val);
    boardcastCandidates();
    res.end();
});

router.post('/clearCandidates', function(req, res) {
    candidates = [];
    boardcastCandidates();
    res.end();
});

router.post('/setWithReplacement', function(req, res) {
    isWithoutReplacement = req.param('isWithoutReplacement') === "true";
    io.emitIsWithoutReplacement(isWithoutReplacement);
    res.end();
});

router.post('/gsheet', function(req, res) {
    var shareableLink = req.body.url;
    if (shareableLink && shareableLink !== "") {
        console.log("Google Sheet shareable link: " + shareableLink);
        var gSheetId = shareableLink.match(/.+spreadsheets\/d\/([a-zA-Z0-9_]+)/);
        if(gSheetId) {
            gSheetId = gSheetId[1];
            console.log("Sheet Id: " + gSheetId);
            gsheet.readColumn(gSheetId).then(function(names) {
                candidates = candidates.concat(names);
                boardcastCandidates();
            });
        } else {
            console.log("Sheet Id not found.");
        }
    }
    res.end();
});

router.get('/rand', function(req, res) {
    var randomNumber = _.random(candidates.length - 1),
        poorMan = candidates[randomNumber];
    io.emitRandResult(poorMan);
    if (isWithoutReplacement) {
        candidates = _.without(candidates, poorMan);
        boardcastCandidates();
    }
    res.end();
});

io.on('connection', function(socket) {
    socket.emit('candidates', candidates);
    socket.emit('isWithoutReplacement', isWithoutReplacement);
});

var boardcastCandidates = function() {
        io.emitCandidates(candidates);
    };

module.exports = router;
