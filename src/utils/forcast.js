
const request = require('request');

const callingLocation=(lat, long ,callback)=>{

    const url = "http://api.weatherstack.com/current?access_key=601bbd468a6540ddaacd0af5ad553487&query="+long+","+lat+"&units=f";

   // request({url ,json:true},(error,response)=>{
 request({url ,json:true},(error,{body}={})=>{
    if(error){
        callback("unable to connect wether api",undefined);
       
    }
    else if(body.error)
    {
        callback("unable to find the location",undefined);
    }
    else{
        const data = body
        //console.log("it is currently "+data.current.temperature+" degree out"+" but feel like "+data.current.feelslike);
        callback(undefined,data)
    }
     //console.log(data);
})


}

module.exports= callingLocation