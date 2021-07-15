const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// setup geocode and forecast 
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //* If we change the name of views folder
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath))

//* app.com
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Avnish Anand'
    })
})

//* app.com/about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Avnish Anand'
    })
})

//* app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Avnish Anand',
        message: 'This is the help message'
    })
})

//* app.com/weather
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({ 
            error: 'Please enter a address to search for weather'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if( error ){
            return res.send({ 
                error
            })
        }
    
        forecast(latitude, longitude, (error, weather) => {
            if( error ){
                return res.send({ 
                    error
                })
            }

            res.send({
                forecast: weather,
                location,
                address: req.query.address
            })
    
            console.log(location)
            // console.log('Data: ', weather)
        })
    })
})

// app.get('/products', (req, res) => {
//     res.send({
//         products:[]
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404 Error Page',
        name: 'Avnish Anand',
        message: 'Help Article not found.'
    })
})

//* app.com/* (404 page)
app.get('*', (req, res) => {
    res.render('404page', {
        title: '404 Error Page',
        name: 'Avnish Anand',
        message: 'Page not found.'
    })
})

app.listen(5000 , () => {
    console.log('Server is listening on port 5000.....')
})