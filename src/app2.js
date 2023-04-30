const express = require('express');
const path = require('path');
const hbs = require("hbs");
const geocode = require('./utils/utils_geocode');
const forecast = require('./utils/utils_forecast');

const app = express();
const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');

app.set('views',path.join(__dirname,'../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.get('', (req, res) => {
    res.render('index_1',{
        title:"Weather",
        name: "Uthkarsh Gaikwad"
    });
});

app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "please provide the location field"
        })
    }

    geocode(req.query.address,(errorReceived, message = {}) => {
        if(errorReceived === undefined){
            forecast(message.latitude, message.longitude, (errorReceivedForecast, forecastMessage = {}) => {
                if(errorReceivedForecast === undefined){
                    return res.send({
                        temperature: forecastMessage.temperature,
                        location : forecastMessage.name,
                    })
                }
                else{
                    return res.send({
                        error: errorReceivedForecast
                    })
                }
            })
        }
        else{
            return res.send({
                error: errorReceived
            }) 
        }
    }); 

});


app.listen(3000, () => {
    console.log("The port is up on 3000");
});