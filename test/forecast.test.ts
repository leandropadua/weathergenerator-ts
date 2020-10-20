import { PressurePredictor, TemperaturePredictor } from '../lib/predictors';
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
describe('temperatura predictor', () => {
  const zeroLocation = new Coordinates({ altitude: 0, latitude: 0, longitude: 0 });
  // positionHighLatitude = new Position(85.0, 0.0, 0);
  const night = new Date('2015-12-25 0:02:12');
  const day = new Date('2015-12-25 12:02:12');
  it('should be lower at night on average', () => {
    const nightTemperatures: number[] = [];
    const dayTemperatures: number[] = [];
    [...Array(100).keys()].forEach(() => {
      nightTemperatures.push(TemperaturePredictor.predict(zeroLocation, night));
      dayTemperatures.push(TemperaturePredictor.predict(zeroLocation, day));
    });
    expect(average(dayTemperatures)).toBeGreaterThan(average(nightTemperatures));
  });
});
