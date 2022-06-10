
const express = require("express");
const https = require("https");
const app = express();

app.listen(3000, () => {
    console.log("Server has started on port 3000");
});

app.get("/", (req, res) => {

    const API_URL = "https://api.openweathermap.org/data/2.5/weather?id=524901&appid=30aafa44186f5691dfbf24a44ed73b94&units=metric&q=Malaysia"
    // URL authentication and parameters using POSTMAN

    https.get(API_URL, (response) => {
        console.log(response.statusCode);
        
        response.on("data", (data) => {
            console.log(data);
            
            const weatherData = JSON.parse(data); // Convert hexadecimal to JSON format
            const temp = weatherData.main.temp; // Temperature
            const feelsLike = weatherData.main.feelsLike; // get the feels like properties
            const description = weatherData.weather[0].description; // Get the des
            const icon = weatherData.weather[0].icon;
            const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            res.write(`
                    <h1>The temperature in Malaysia its ${temp} degree Celsius </h1>
                    <p>The weather its currently ${description}</p>
                    <img src="${iconURL}" alt="An image of the current weather" >
                `);

            res.send(); // After write we send the string
            console.log(temp);
        });
    });
});
