const express = require("express")
const path=require("path")
const hbs=require("hbs")
const geocode=require("./utils/geocode")
const forecast=require("./utils/forecast")
// constants
const app =express()
const publicDir=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,"../templates/partials")
const utilsPath=path.join(__dirname,"../templates/partials")
// use static dir
app.use(express.static(publicDir))

// set the handlebars folder
app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

// routes
app.get("",(req,res)=>{
    res.render("index",{
        title:"Home",
        footerTitle:"Created by hbs"
    })
});

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About me",
        name:"Jack and jill",
        footerTitle:"Created by hbs"
    })
});

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        description:"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum v lorem ipsumlorem ipsum",
        footerTitle:"Created by hbs"
    })
});

app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"404 page",
        description:"Page not Found!!!!!"
    })
    
});

app.get("/weather",(req,res)=>{
    if(!req.query.address)
    return res.send({
        error:"Address Not found!!!!!"
    })
    geocode.geocode(req.query.address,(err,{longitude, latitude,location}={})=>{
        if (err) return res.send({err})
        else {
            forecast.forecast(longitude, latitude, (err, forecastData) => {
                if(err)
                return res.send({err})
              res.send({
                  location:location,
                  forecast:forecastData
              })
            });
          }
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        
    })
})
app.listen(3000,()=>{
    console.log("Server connected")
})