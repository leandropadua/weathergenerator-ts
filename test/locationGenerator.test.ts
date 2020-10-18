import { EarthParameters } from '../lib/util/earthParameters';
import { generateLocation } from '../lib/util/locationGenerator';

describe('random location generator', () => {
  it('gerate within boundaries', () => {
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
});
