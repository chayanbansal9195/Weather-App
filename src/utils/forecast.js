const request=require("request")

exports.forecast=(longitude,latitude,callback)=>{
    const options={
        url:"https://api.darksky.net/forecast/2451857f329e1604044c78e2694b014f/"+longitude+","+latitude,
        json:true
    }
    request(options,(err,{body})=>{
        if(err)callback("Unable to reach the forecast site");
        else if(body.error)callback("The longitude and latitude defined is not present!!",undefined);
        else{
            callback('',
               body.daily.data[0].summary+' It is currently '+body.currently.temperature
            )
            
        }
    })
}