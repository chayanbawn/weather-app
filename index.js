const express = require('express')
const bp = require('body-parser');
const request = require('request');
const app = express();
const apiKey = 'YOUR_API_KEY';


app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('public'));
app.use(bp.urlencoded({ extended: true }));



app.get('/', (req, res) => res.render('index', {weather: null, error: null}));

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function (err, response, body) {


        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
            res.end();
        
        }


        let weather = JSON.parse(body)
        if(weather.main == undefined){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weatherText = `Current temperature in ${city} is: ${weather.main.temp} F`;
            res.render('index', {weather: weatherText, error: null});
        }

    });
   
  })


app.listen(3000, () => console.log("App listening on port: 3000"))