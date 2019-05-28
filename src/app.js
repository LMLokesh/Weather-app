const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast =  require("./utils/forecast");

const app = express();

// Define paths for Express config 
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', "hbs");
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Lokesh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Lokesh'
    })
})
app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Lokesh'
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"You must provide a address for getting weather details"
        })
    }
    // res.send({
    //     forecast: "It is snowing",
    //     location: "Philadelphia",
    //     address: req.query.address
    // })
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if( error ) {
            return res.send({
                error: error 
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                })
            }

            console.log(location)
            res.send({
                forecast : forecastData,
                location,
                addresss: req.query.address 
            })
        })
    })
});

app.get('/products', (req, res) =>{
    if( !req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
        return;
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        message: "Help article not found",
        name: 'Lokesh',
        title: "404: Page Not found"
    });
})

app.get("*", (req, res) => {
    res.render("404", {
        message: "Page Not found",
        title: "404",
        name: 'Lokesh'
    });
})

app.listen(3000, () => console.log("Server is up on port 3000"));