const request = require("request");

const forecast = (latitude, longitude, callback) => {
    // Getting Weather details using latitude and longitude from DarkSky
    const darkSkyApi = `https://api.darksky.net/forecast/1d1978cece25de83e6ee419af38454fe/${latitude},${longitude}?units=auto`
    request({url: darkSkyApi, json: true}, (err, {body}) => {
        if(err){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error){
            callback('Unable to find location', undefined);
        } else {
            const currently = body.currently;
            const data = 
                `${body.daily.data[0].summary} 
                It is currently ${currently.temperature} degrees out. 
                This high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}. 
                There is a ${currently.precipProbability}% of rain`
            callback(false, data)
        }
    })
}

module.exports = forecast;