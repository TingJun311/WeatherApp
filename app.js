
const express = require("express");
const https = require("https");
const bodyData = require("body-parser");
const { log } = require("console");
const app = express();

app.use(bodyData.urlencoded({
    extended: true
}));

app.listen(3000, () => {
    console.log("Server has started on port 3000");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => { 
    // Get the POST req when user click view
    const key = "30aafa44186f5691dfbf24a44ed73b94";
    const country = req.body.countryName; // Store the user input
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?id=524901&appid=${key}&units=metric&q=${country}`
    // URL authentication and parameters using POSTMAN
    
    if (!country) {
        res.redirect("/");
    }
    https.get(API_URL, (response) => {
        console.log(response.statusCode);
        
        response.on("data", (data) => {

            try {
                const weatherData = JSON.parse(data); // Convert hexadecimal to JSON format
                const temp = weatherData.main.temp; // Temperature
                const feelsLike = weatherData.main.feelsLike; // get the feels like properties
                const description = weatherData.weather[0].description; // Get the des
                const icon = weatherData.weather[0].icon;
                const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                
                res.write(`
                    <h1>The temperature in ${country} its ${temp} degree Celsius </h1>
                    <p>The weather its currently ${description}</p>
                    <img src="${iconURL}" alt="An image of the current weather" >
                    <p>${feelsLike}</p>
                `);
                
                res.send(); // After write we send the string
                console.log(temp);
            } catch (error) {
                console.log(error);
                res.redirect("/");
            }
        });
    });
})
