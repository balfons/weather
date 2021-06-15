import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { format, subDays } from 'date-fns';
import { Hourly, TimemachineResponse } from './interfaces/timemachine.interface';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

app.use(cors());

app.get('/api/weather/stats', async (req, res) => {
  const numberOfDays: number = Number(req.query.numberOfDays);

  try {
    const dates = Array.from({ length: numberOfDays }, (v, i) => i)
      .map(days => format(subDays(new Date(), days), 't'));

    const requests: Array<Promise<TimemachineResponse>> = dates.map(date => {
      return axios
        .get(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=57.708870&lon=11.974560&units=metric&dt=${date}&appid=${process.env.OPEN_WEATHER_API_KEY}`)
        .then(({ data }) => data)
    });

    const responses: Array<TimemachineResponse> = await Promise.all(requests);

    const allHourlyData: Array<Hourly> = responses
      .map(response => response.hourly)
      .flat(1);

    const averageTemperature: number = allHourlyData.reduce((a, b) => a + b.temp, 0) / allHourlyData.length;

    const len = allHourlyData.length
    const allHourlyDataSorted = allHourlyData.sort();
    const mid = Math.ceil(len / 2);

    const medianTemperature: number = len % 2 == 0
      ? (allHourlyDataSorted[mid].temp + allHourlyDataSorted[mid - 1].temp) / 2 // Array length is even
      : allHourlyDataSorted[mid - 1].temp; // Array length is uneven

    const maxTemperature: number = Math.max(...allHourlyData.map(({ temp }) => temp));
    const minTemperature: number = Math.min(...allHourlyData.map(({ temp }) => temp));
    
    const response = {
      averageTemperature,
      medianTemperature,
      maxTemperature,
      minTemperature,
    }

    res.send(response);
  } catch (error) {
    res.status(500).send('Could not fetch weather stats')
  }
});


const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));

module.exports = app;

console.log(server.address());