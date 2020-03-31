const request=require("request")

exports.geocode=(address,callback)=>{
    const options={
        url:"https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?limit=1&access_token=pk.eyJ1IjoiY2hheWFuYmFuc2FsIiwiYSI6ImNrOGU0enh3ZTEyZnEzbW1qYXM3dDNvNTYifQ.rNrAh67xRkwcLGYOrT_3jw",
        json:true
    }
    request(options,(err,{body})=>{
        if(err)
        callback("Unable to reach the geolocation site");
        else if(body.features.length===0)
        callback("The address is defined is not present!!",undefined);
        else{
            callback('',{
               longitude:body.features[0].center[0],
               latitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
            
        }
    })
}

