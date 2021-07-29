const express = require("express");
const app = express();

const fetch = require('node-fetch');

require('dotenv').config(); //to pull api-key from .env 
console.log(process.env);


app.listen(5000, ()=> console.log("Listening on port 5000."));
app.use(express.static('public'));  //NOTE: anything in this folder can be viewed by the public, this is why it is called 'public'
app.use(express.json({limit: '1mb'}));


const Datastore = require("nedb");
const database = new Datastore('database.db');
database.loadDatabase();


//API

//ROUTE
app.get("/api", (request, response)=> {
    database.find({}, (err, data)=> {
        if(err) {
            res.end();
            console.log("error: ", err);
            return;
        }
        response.json(data);
    });
});
//_____________________________________
app.post("/api", (request, response)=> {
    // console.log(request);
    console.log(request.body);
    const data = request.body; 
    console.log(data);
    const apiTimestamp = Date.now();
    data.apiTimestamp = apiTimestamp;

    database.insert(data);
    // database.insert(request.body);

    response.json(data);
    // response.json(request.body);
});

app.get('/weather/:latlon', async (request, response)=> {

    const latLon = request.params.latlon.split(',');
    const lat = latLon[0]; //console.log(lat);
    const lon = latLon[1]; //console.log(lon);
    const api_key = process.env.API_KEY;

    const weather_api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    const aq_api_url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${api_key}`;

    //weather from openweathermap
    const weather_response = await fetch(weather_api_url);
    const weather_data = await weather_response.json();

    //air quality from openweathermap
    const aq_response = await fetch(aq_api_url);
    const aq_data = await aq_response.json();

    results_data = {
        weather: weather_data,
        aq: aq_data
    }
    // console.log(results_data);

    response.json(results_data);    //QUESTION: what does this line do?
})