const request = require("request");

// Getting Weather status from darkSky using a latitude and longitude

// Getting latitude and longitude from Mapbox site using city Name - Bangalore
// const mapBoxApi = "https://api.mapbox.com/geocoding/v5/mapbox.places/Bangalore.json?access_token=pk.eyJ1IjoibG9rZXNobG0iLCJhIjoiY2p2cWIweXQ2MDA3YzQ0cG4wcnJyaDRwYSJ9.jdFKFywSQrvTlvkLvbXIEg&limit=1";

// request({url: mapBoxApi, json: true}, (err, response) => {
//     if(err){
//         console.log("Unable to connnect to weather service");
//     } else if (response.body.error){
//         console.log("Unable to find Location");
//     } else {
//         const center = response.body.features[0].center;
//         const darkSkyApi = `https://api.darksky.net/forecast/1d1978cece25de83e6ee419af38454fe/${center.join(",")}?units=us`
//         request({url: darkSkyApi, json: true}, (err, response) => {
//             if(err){
//                 console.log("Unable to get weather details : ", err);
//                 return;
//             }
//             const currently = response.body.currently;
//             console.log(`It is currently ${currently.temperature} degrees out, There is a ${currently.precipProbability}% of rain`);
//         })
//     }
// })


const getGeoCode = (location, callback) => {
    // Getting latitude and longitude from Mapbox site using city Name - location
    const mapBoxApi = "https://api.mapbox.com/geocoding/v5/mapbox.places/Bangalore.json?access_token=pk.eyJ1IjoibG9rZXNobG0iLCJhIjoiY2p2cWIweXQ2MDA3YzQ0cG4wcnJyaDRwYSJ9.jdFKFywSQrvTlvkLvbXIEg&limit=1";

    request({url: mapBoxApi, json: true}, (err, response) => {
        if(err || response.body.error){
            callback(true)
        } else {
            const center = response.body.features[0].center;
            callback(false, center);
        }
    })
}


const forecast = (center, callback) => {
    // Getting Weather details using latitude and longitude from DarkSky
    const darkSkyApi = `https://api.darksky.net/forecast/1d1978cece25de83e6ee419af38454fe/${center.join(",")}?units=us`
    request({url: darkSkyApi, json: true}, (err, response) => {
        if(err){
            callback(err)
        } else {
            const currently = response.body.currently;
            callback(false, currently)
        }
    })
}

// Getting latitude and langitude 
getGeoCode("Bangalore", (err, center) => {
    if(!err && center){
        console.log("Longitude :", center[0] );
        console.log("Latitude :", center[1] )

        // Getting Weather Details
        forecast(center, (err, currentlyDetails) => {
            if(!err && currentlyDetails){
                console.log(`It is currently ${currentlyDetails.temperature} degrees out, There is a ${currentlyDetails.precipProbability}% of rain`);
            } else {
                console.log("Unable to get weather details : ", err);
            }   
        })
    } else {
        console.error("Unable to find the Langitude and Latitude for the Location");
    }
});