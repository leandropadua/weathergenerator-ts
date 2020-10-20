import { EarthParameters } from '../lib/util/earthParameters';
import { generateLocation, randomDate } from '../lib/util/randomGenerator';

describe('random generator', () => {
  it('gerate location within boundaries', () => {
    // generate 100 locations and all of them must be between bounderies
    [...Array(100).keys()].forEach(() => {
      const location = generateLocation();
      expect(location.name.split(' ').length).toBeLessThan(7);
      expect(location.coords.altitude).toBeLessThan(EarthParameters.MAX_ALTITUDE);
      expect(location.coords.latitude).toBeLessThan(90);
      expect(location.coords.latitude).toBeGreaterThan(-90);
      expect(location.coords.longitude).toBeLessThan(180);
      expect(location.coords.longitude).toBeGreaterThan(-180);
    });
  });

  it('generate date between dates', () => {
    const initial = new Date('2015-12-24 15:30:55');
    const final = new Date('2016-12-29 11:35:35');
    [...Array(100).keys()].forEach(() => {
      const date = randomDate(initial, final);
      expect(date.getTime()).toBeGreaterThan(initial.getTime());
      expect(date.getTime()).toBeLessThan(final.getTime());
    });
  });
});
