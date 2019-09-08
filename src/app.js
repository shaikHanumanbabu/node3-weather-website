const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');

const foreCast = require('./utils/forecast');
// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

const publicDir = path.join(__dirname,'../public');
const app = express();
const port = process.env.PORT || 3000;
const viewPath = path.join(__dirname, './templates/views');
const partialPath = path.join(__dirname, './templates/partials');
app.use(express.static(publicDir));
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);
app.get('/', (req, res) =>
{
    res.render('index',{
        title : "Weather app",
        created : "Hanuman"
    });
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title : 'About',
        created : "Hanuman"
    });
})

// Help Route

app.get('/help', (req, res) =>{
    res.render('help',{
        title : 'Help',
        created : "Hanuman"
    });
})

app.get('/help/units', (req, res) =>{
    res.render('help',{
        title : 'Help',
        created : "Hanuman"
    });
})

app.get('/help/*', (req, res) =>{
    res.send('Page not Found!')
})

app.get('/products', (req, res) => {
    console.log(req.query.search);
    if (!req.query.search) {
       return res.send({
            error : "You must provide a search term"
        })
    }
    res.send({
        products : []
    })
})
app.get('/weather', (req, res) =>
{
    if (!req.query.address) {
        return res.send('Not Valid Url!');
    }
    geoCode(req.query.address, (error, {latitude, langn} ={}) => {
        if (error) {
           return res.send({error}); 
        } 
            foreCast(latitude, langn, (error, {summary, temperature, precipProbability}) => {
                if (error) {
                    console.log(error);
                    return res.send(error);
                    
                } 
                res.send({summary,temperature,precipProbability})
            })
            
        
        
    })
})

app.get('*', (req, res) =>{
    res.render('404',{
        title : 'Page Not Found!',
        created : 'Hanuman'
    });
})

app.listen(port, () =>
{
    console.log('Server Running!');
    
})