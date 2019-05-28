const request = require("request");

const geocode = (location, callback) => {
    // Getting latitude and longitude from Mapbox site using city Name - location
    const mapBoxApi = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibG9rZXNobG0iLCJhIjoiY2p2cWIweXQ2MDA3YzQ0cG4wcnJyaDRwYSJ9.jdFKFywSQrvTlvkLvbXIEg&limit=1`;

    request({url: mapBoxApi, json: true}, (err, { body }) => {
        if(err) {
            callback('Unable to connect to location services!', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location. Try another serach.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1], 
                longitude: body.features[0].center[0], 
                location: body.features[0].place_name 
            });
        }
    })
}

module.exports = geocode;