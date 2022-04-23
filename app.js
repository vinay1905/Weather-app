const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html");

    });

app.post("/", function(req, res){
    console.log("post request received");
    const querycity = req.body.cityName;

    const url = "https://api.openweathermap.org/data/2.5/weather?&q="+querycity+"&appid=e9e8edf3f68db757ff5e19c6503556a8&units=metric";  

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data1){

            const weatherdata = JSON.parse(data1);

            const temp = weatherdata.main.temp;
            console.log(temp);
            const weatherdescription = weatherdata.weather[0].description;
            console.log(weatherdescription);
            const weathericon = weatherdata.weather[0].icon;
            const imageurl ="http://openweathermap.org/img/wn/"+ weathericon +"@2x.png";

            res.write("<h1>The Temperature in " +querycity+ " is "+temp+" degree celcius</h1>");
            res.write("<h3>The weather is currently "+ weatherdescription+"</h3>");
            res.write("<img src="+imageurl+">");

            res.send();

        });
    });
});

    



app.listen(3000, function(){
    console.log("Server started at port 3000");
});