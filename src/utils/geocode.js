const request = require('request')
const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWxpMTEyMiIsImEiOiJja2V4ZGF6Y2UwZGFsMzBsOG44enJ2ZjR4In0.Do39Rak3AY-9DJLEwZ9XQA'
    
    request({url,json:true},(error,{body})=>{
    if(error){
        callback('Unable to connect to location services',undefined)
    }else if(body.features.length===0){
        callback('Unable to find loc',undefined)
    }else{
    callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name
    })
    }
    
    })
    }
module.exports = geocode