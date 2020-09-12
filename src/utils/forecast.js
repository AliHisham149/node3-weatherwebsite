const request= require('request')
const forecast=(long,lat,callback)=>{
const url= 'https://api.darksky.net/forecast/e6af5b5feb891b272e18f5e2fc0370a6/'+long+','+lat
request({url,json:true},(error,{body})=>{
    if(error){
        callback('Unable to connect')
    }else if (body.error){
        callback('Unable to find loc')
    }else{
        callback(undefined,body.daily.data[0].summary)
    }
})
}
module.exports= forecast