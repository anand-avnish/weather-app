const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicXVvdGVya2luZyIsImEiOiJja3IzNmVkOWQyaWMyMnpxYWlkYzZsM3g3In0.Mu3XoX3stpZeePUXiIeSzw&limit=1'

    request({ url: url, json: true}, (error, { body }) => {
        // console.log(body)
        if (error){
            callback('Unable to connect to location service!', undefined)
        }else if ( body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        } else{
            const data = body.features[0]
            callback(undefined, {
                latitude: data.center[1],
                longitude: data.center[0],
                location: data.place_name
            })
            // console.log('The Latitude is '+data.center[1]+' and the Longitude is '+ data.center[0] + ' of '+ data.place_name +'.')
        }
    })
}

module.exports = geoCode