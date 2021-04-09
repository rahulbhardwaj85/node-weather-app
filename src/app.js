const path = require('path');  // provide by node core module fro getting path
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

console.log(__dirname);   //node give two var. in which getting path
//console.log(__filename);
//console.log(path.join(__dirname,"../templates"));

const app = express();

// define path to ecpress config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// setup handle bar engion and views location
app.set('view engine', 'hbs'); // use hbs dor dynamic html page and render app.js data in html file
app.set('views', viewsPath);  // give path to hbs files
hbs.registerPartials(partialsPath);

//satup static directory to serve
app.use(express.static(publicDirectoryPath))   //customiz server


app.get('', (req, res) => {
    // res.send("<h1>Hello express</h1>");
    res.render('index', {
        title: "Weather",
        name: "Rahul Bhardwaj"
    });
})


app.get('/help', (req, res) => {

    // res.send([{
    //     name: 'rahul',
    //     age: 27
    // }, {
    //     name: 'sunil',
    //     age: 60
    // }]);
    res.render('help', {
        helpText: "some help text",
        title: "Help",
        name: "Rahul Bhardwaj"
    });
})




app.get('/about', (req, res) => {

    // res.send("<h1>Anout</>");
    res.render('about', {
        title: "About me",
        name: "Rahul Bhardwaj"
    });
})





app.get('/help/*', (req, res) => {     // if url is /help/something then it work
    // res.send('help artical does not found')
    res.render('404', {
        title: 404,
        errorMessage: "Help article not found",
        name: "Rahul Bhardwaj"
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "address is missing"
        })
    }

    geocode(req.query.address, (err, {lat,long,location}={}) => {
        if (err) {
            return  res.send({
                error: err
            })
        }

        forcast(lat, long, (err, data) => {

            if (err) {
                return  res.send({
                    error: err
                })
            }

            console.log("it is currently " + data.current.temperature + " degree out" + " but feel like " + data.current.feelslike);
            res.send({
                forcast: "it is currently "+data.current.temperature+" degree out"+" but feel like "+data.current.feelslike,
                temperature: data.current.temperature,
                location,
                feelslike: data.current.feelslike

            });
        })
    })


})

app.get("/product", (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "you must provide search term"
        })
    }

    console.log("productReq", req.query);
    res.send({
        product: req.query.search
    })
})


app.get('*', (req, res) => {
    // res.send('My 404 page')
    res.render('404', {
        title: 404,
        errorMessage: "Page not found",
        name: "Rahul Bhardwaj"
    })
})



app.listen(3000, () => {
    console.log("App is running on port 3000")
})