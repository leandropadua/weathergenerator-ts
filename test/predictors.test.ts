import { HumidityPredictor, PressurePredictor, TemperaturePredictor } from '../lib/predictors';
import { EarthParameters } from '../lib/util/earthParameters';
import { Coordinates } from '../lib/weather';

describe('pressure predictor', () => {
  it('should be sea level pressure when altitude is zero', () => {
    const elevation = 0;
    expect(PressurePredictor.predict(elevation)).toEqual(EarthParameters.PRESSURE_AT_SEA_LEVEL);
  });

  it('it should be maximum at max altitude', () => {
    expect(PressurePredictor.predict(EarthParameters.MAX_ALTITUDE)).toEqual(EarthParameters.PRESSURE_AT_MAX_ALTITUDE);
  });

  it('should be between max and sea level for intemediate altitudes', () => {
    const altitude = EarthParameters.MAX_ALTITUDE / 10;
    const pressure = PressurePredictor.predict(altitude);
    expect(pressure).toBeLessThan(EarthParameters.PRESSURE_AT_SEA_LEVEL);
    expect(pressure).toBeGreaterThan(EarthParameters.PRESSURE_AT_MAX_ALTITUDE);
  });
});
const average = (arr: number[]) => arr.reduce((x, y) => x + y, 0) / arr.length;
describe('temperature predictor', () => {
  const zeroLocation = new Coordinates({ altitude: 0, latitude: 0, longitude: 0 });
  const night = new Date('2015-12-25 0:02:12');
  const day = new Date('2015-12-25 12:02:12');
  const nightTemperatures: number[] = [];
  const dayTemperatures: number[] = [];

  const highLatitudeLocation = new Coordinates({ latitude: 85.0, longitude: 0.0, altitude: 0 });
  const highLatitudeTemperatures: number[] = [];

  const southLocation = new Coordinates({ latitude: -31.0, longitude: 145.0, altitude: 1000 });
  const summerDaySouth = new Date('2015-12-25 0:00:00');
  const winterDaySouth = new Date('2015-08-25 0:00:00');
  const summerTemperatures: number[] = [];
  const winterTemperatures: number[] = [];

  const highAltitudeLocation = new Coordinates({ latitude: 0, longitude: 0, altitude: 5000 });
  const highAltitureTemperatures: number[] = [];

  [...Array(100).keys()].forEach(() => {
    nightTemperatures.push(TemperaturePredictor.predict(zeroLocation, night));
    dayTemperatures.push(TemperaturePredictor.predict(zeroLocation, day));
    highLatitudeTemperatures.push(TemperaturePredictor.predict(highLatitudeLocation, day));
    summerTemperatures.push(TemperaturePredictor.predict(southLocation, summerDaySouth));
    winterTemperatures.push(TemperaturePredictor.predict(southLocation, winterDaySouth));
    highAltitureTemperatures.push(TemperaturePredictor.predict(highAltitudeLocation, day));
  });

  it('should be lower at night on average', () => {
    expect(average(dayTemperatures)).toBeGreaterThan(average(nightTemperatures));
  });

  it('should be lower at high latitude', () => {
    expect(average(highLatitudeTemperatures)).toBeLessThan(average(dayTemperatures));
  });

  it('should be higher at summer', () => {
    expect(average(summerTemperatures)).toBeGreaterThan(average(winterTemperatures));
  });

  it('should be lower at high altitude', () => {
    expect(average(highAltitureTemperatures)).toBeLessThan(average(dayTemperatures));
  });
});

describe('humidity predictor', () => {
  it('should be higher at high temeratures', () => {
    let humidityHighTemperature = 0;
    for (let i = 0; i < 100; i++) {
      const temperature = 30;
      humidityHighTemperature += HumidityPredictor.predict(EarthParameters.PRESSURE_AT_SEA_LEVEL, temperature);
    }
    humidityHighTemperature /= 100;

    let humidityLowTemperature = 0;
    for (let i = 0; i < 100; i++) {
      const temperature = 10;
      humidityLowTemperature += HumidityPredictor.predict(EarthParameters.PRESSURE_AT_SEA_LEVEL, temperature);
    }
    humidityLowTemperature /= 100;

    expect(humidityLowTemperature).toBeLessThan(humidityHighTemperature);
  });
});
