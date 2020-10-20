import { WeatherPredictor } from '../lib/predictors';
import { generateLocation, randomDate } from '../lib/util/randomGenerator';

const yearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
let numberToGenerate = isNaN(Number(process.env.LOCATIONS)) ? 10 : Number(process.env.NUMBER_TO_GENERATE);
numberToGenerate = numberToGenerate > 1000 ? 1000 : numberToGenerate;
[...Array(numberToGenerate).keys()].forEach(() => {
  const location = generateLocation();
  const date = randomDate(yearAgo, new Date());
  const weather = WeatherPredictor.predict(location, date);
  console.log(weather.toString());
});
