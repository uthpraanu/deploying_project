const request = require("request");

const geoCode = (place, callback) => {
    geoCodeUrl = `http://api.positionstack.com/v1/forward?access_key=1c6202a98f2879855cec93549f147ff1&query=${encodeURIComponent(place)}`;

    request({url : geoCodeUrl, json: true}, (error, response) => {
        if(error){
            callback("Some Error Occured !!!, Can't connect to the weather service",undefined);
        }
        else if(response.body.error){
            callback("Some error occured !!!, Can't fetch the details",undefined);
        }
        else if(response.body.data.length === 0){
            callback("Cannot find the place!!!, or you spelled the place wrong !!!", undefined);
        }
        else{
            callback(undefined,{
                latitude: response.body.data[0].latitude,
                longitude: response.body.data[0].longitude, 
            })
        }
    })
}

module.exports = geoCode;