const request = require("request");

const foreCast = (latiude, longitude, callback) => {
    const foreCastUrl = `http://api.weatherstack.com/current?access_key=62d72400862d909930f6f5c1b42d24aa&query=${latiude},${longitude}&units=m`;

    request({ url : foreCastUrl, json : true}, (error, response) => {
        if(error){
            callback("Some Error Occured !!!, Can't connect to the weather service", undefined);
        }
        else if(response.body.error){
            callback("Some error occured !!!, Can't fetch the details", undefined);
        }
        else{
            callback(undefined, {
                temperature: response.body.current.temperature,
                feelsLike: response.body.current.feelslike,
                name: response.body.location.name,
            });
        }
    });
}

module.exports = foreCast;