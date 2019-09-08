const request = require('request');

const geoCode = (address, cb) =>
{
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiaGFudW1hbi0xMjMiLCJhIjoiY2p6bm0wOHd1MDU3MTNpbHZxeWtqZzY0cyJ9.pZh50Qu3MFIsxFLKraJIFw&limit=1';

    request({url, json: true}, (err, {body}) =>
    {   
        if (err) { 
            cb('Please Check Your Network Settings', undefined);
            
        } else if(body.features.length === 0){
            cb('Can \'t Find Location', undefined);
            
        } else {
            const data = {
                
                    latitude: body.features[0].center[1],
                    langn: body.features[0].center[0],
                    place: body.features[0].place_name
                
            }
            cb(undefined, data)
            
        }
    })
}

module.exports = geoCode;