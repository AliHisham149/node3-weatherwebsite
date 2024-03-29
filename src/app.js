const path = require('path')
const express = require('express')
const hbs= require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup hbs engine and viiews location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve 
app.use(express.static(path.join(__dirname,'../public')))


app.get('',(req,res)=>{
res.render('index',{
    title:'Weather',
    name:'Ali'
})

})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About'
        ,name:'Ali'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'this is helpful',
        title:'Help'
        ,name:'Ali'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'No address provided, Please provide address'
        })
    }
    geocode(req.query.address,(error, {latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
            return res.send(error)
            }

    res.send({
        forecast:forecastData,
        location,
        address: req.query.address
    })
        })})})
app.get('/products',(req,res)=>{
    if(!req.query.search){
      return  res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
res.render('404',{ 
        title:'404',
        name:'Ali'
        ,errorMessage:'Help article not found'
        })
})

app.get('*',(req,res)=>{
    res.render('404',{
    title:'404',
    name:'Ali'
    ,errorMessage:'Error 404: Page not found'
    })

})
//app.com
//app.com/help
//app.com/about

app.listen(port,()=>{
    console.log('Server is up on port 3000.')
})