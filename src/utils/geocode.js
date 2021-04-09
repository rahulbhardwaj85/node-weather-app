const request = require('request');


const geocode=(adress,callback)=>{

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(adress)+".json?access_token=pk.eyJ1IjoicmFodWxiaGFyZHdhaiIsImEiOiJja215cWhieHUwNml4Mm9udW91ZHl2dmxhIn0.jR6CakMMmoDmNDHWmfLNVg"
 request({url ,json:true},(error,{body})=>{

    if(error){
        callback('unable to connect wether api',undefined);
    }
    else if(body.features.length === 0)
    {
    
        callback('unable to find the location',undefined);
    }
    else{
        const lat = body.features[0].center[1];
        const long = body.features[0].center[0];
        const location = body.features[0].place_name;
        console.log(`lat:${lat} long: ${long} location: ${location}`);
    //    const data ={
    //        lat:lat,
    //        long:long,
    //        location:location
    //    }
    const data ={
        lat,
        long,
        location
    }
       callback(undefined,data);
    }

})

}

module.exports = geocode