const request = require('request');

const foreCast = (lati, lang, cb) =>
{
    const url = 'https://api.darksky.net/forecast/a3c947057bb581672a8dc143d5f38800/'+lati+','+lang+'?units=si';
    request({url:url, json:true}, (err, {body}) =>
{
    // const data = JSON.parse(res.body);
    console.log(err);
    if (err) {
        cb('Unble to Connect', undefined);
        
    } else if(body.error)
    {
        cb('Invalid Details Please Check it Once!', undefined);
        
    }
     else {
        cb(undefined,
            {
                summary: body.daily.data[0].summary,
                temperature : body.currently.temperature,
                precipProbability : body.currently.precipProbability
            });
    }
})

}

module.exports = foreCast;
