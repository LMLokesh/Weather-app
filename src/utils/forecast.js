const request = require("request");

const forecast = (latitude, longitude, callback) => {
    // Getting Weather details using latitude and longitude from DarkSky
    const darkSkyApi = `https://api.darksky.net/forecast/1d1978cece25de83e6ee419af38454fe/${latitude},${longitude}?units=auto`
    request({url: darkSkyApi, json: true}, (err, response) => {
        if(err){
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error){
            callback('Unable to find location', undefined);
        } else {
            const currently = response.body.currently;
            const data = `${response.body.daily.data[0].summary} It is currently ${currently.temperature} degrees out, There is a ${currently.precipProbability}% of rain`
            callback(false, data)
        }
    })
}

module.exports = forecast;