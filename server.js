const express = require('express');
const app = express();

const sensor = require('node-dht-sensor');

function getTemperature() {
  return new Promise((resolve, reject) => {
    sensor.read(22, 4, function(err, temperature, humidity) {
        if (err) {
          reject(err);
        }

        resolve({temperature, humidity});
    });
  });
}

app.get("/", (req, res) => {
  res.send("It Worked 😎 🤗");
})

app.get('/data', (req, res) => {
  getTemperature()
  .then((data) => {
    res.json(data);
  })
  .catch((error) => {
    res.json(error);
  })
});

app.listen(8080, () => console.log("😎"));