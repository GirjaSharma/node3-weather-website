const path= require('path');
const express= require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const weatherRequest = require('./utils/weatherRequest')

const app = express();

const port = process.env.PORT || 3000

// Defining paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static dictionary to serve
app.use(express.static(publicDir)); //way to customize the server

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: "Moscow"
    })
}) 

app.get('/about', ( req, res)=>{
    res.render('about', {
        title: 'About me',
        name: " Girja"
    })
})

app.get('/help', ( req, res)=>{
    res.render('help', {
        message: 'template message',
        title: 'Help',
        name: " Girja"
    })
})


app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, placeName}={}) =>{
        if(error){
            return res.send({error})
        }
        weatherRequest(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                placeName,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        errorMessage: 'Help article not found',title: '404', name: 'Girja Sharma'})
})

app.get('*', (req,res)=>{    //* -- anything except urls provided
res.render('404',{errorMessage:'Sorry! Page not available - 404', title: '404', name: 'Girja Sharma'})
})

app.listen(port, ()=>{
    console.log('Server started'+ port)
})