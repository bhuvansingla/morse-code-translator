const express = require('express');
const bodyParser = require('body-parser');
const request = require('xmlhttprequest').XMLHttpRequest;
const urlencodedParser = bodyParser.urlencoded({extended:true});
const app = express();

app.get('/', function(req, res) {
    res.sendFile("/index.html", {"root": __dirname});
});

app.post('/morse', urlencodedParser, function(req, res) {
    let enText = req.body.en;
    let url = 'https://api.funtranslations.com/translate/morse.json?text=' + encodeURI(enText);
    let translate = new request;
    translate.open('GET', url, false);
    translate.send(null);
    console.log(translate.responseText)
    let morse = JSON.parse(translate.responseText).contents.translated;
    res.send(morse);
});

app.listen(8002);