const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherapi.com/v1/forecast.json?key=ea2a763fa046491e92a184804211307&q='+ latitude+ ',' + longitude +'&aqi=yes'

    request({ url, json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather service!', undefined)
        }else if ( body.message ){
            callback('Unable to find location. Try another search.', undefined)
        } else{
            const forecastData = body.forecast.forecastday[0].day
            const currentData = body.current
            callback(undefined, {
                condition: forecastData.condition.text,
                forecastData: forecastData,
                currentData: currentData
            })
            console.log(forecastData.condition.text + '. It is currently '+ currentData.temp_c + ' degrees C out. There is wind speed of '+ currentData.wind_kph + ' kph.')
        }
    })
}

module.exports = forecast