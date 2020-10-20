import { ConditionPredictor, HumidityPredictor, PressurePredictor, TemperaturePredictor } from '../lib/predictors';
import { generateLocation, randomDate } from '../lib/util/randomGenerator';
import { Weather } from '../lib/weather';

const yearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
const numberToGenerate = isNaN(Number(process.env.NUMBER_TO_GENERATE)) ? 10 : Number(process.env.NUMBER_TO_GENERATE);
[...Array(numberToGenerate).keys()].forEach(() => {
  const location = generateLocation();
  const date = randomDate(yearAgo, new Date());
  const temperature = TemperaturePredictor.predict(location.coords, date);
  const pressure = PressurePredictor.predict(location.coords.altitude);
  const humidity = HumidityPredictor.predict(pressure, temperature);
  const condition = ConditionPredictor.predict(humidity, temperature);
  const weather = new Weather({
    city: location.name,
    coordinates: location.coords,
    datetime: date,
    temperature,
    pressure,
    humidity,
    condition,
  });
  console.log(weather.toString());
});
