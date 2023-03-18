const request = require('postman-request')


const weatherRequest =(latitude, longitude, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=9675f905ccf7715de43fce1ea5482e4d&query=${latitude},${longitude}&units=f`;
  
    request({url, json: true}, (error, {body})=>{
      if(error){
        callback('Unable to connect to the server', undefined)
      } else if(body.error){
        callback('Unable to connect to the server', undefined)
      } else{
        callback(undefined, `It is currently ${body?.current?.temperature} degrees out. It feels like ${body?.current?.feelslike} degrees out. The visibility will be ${body?.current?.visibility}`)
      }
    })
  }

  module.exports = weatherRequest;