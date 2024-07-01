const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 8000;

app.get('/api/hello', async (req, res) => {
    const visitorName = req.query.visitor_name || 'Guest';
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(clientIp)

    try {
        const locationResponse = await axios.get(`https://ipinfo.io/${clientIp}/json`);
        const { city } = locationResponse.data;
        console.log({city})
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe7556cc4b9adc539ca64339cafdb371&units=metric`);
        const temperature = weatherResponse.data.main.temp;
        console.log(temperature)

        res.json({
            client_ip: clientIp,
            location: city,
            greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${city}`
        });
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch location or weather information' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});