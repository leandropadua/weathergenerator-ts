import { Condition, Coordinates, Weather } from '../lib/weather';

const sydneyWeather = new Weather({
  city: 'Sydney',
  coordinates: new Coordinates({
    latitude: -33.86,
    longitude: 151.21,
    altitude: 39,
  }),
  datetime: new Date('2015-12-23 05:02:12'),
  condition: Condition.RAIN,
  temperature: 12.5,
  pressure: 1004.3,
  humidity: 97,
});

const adelaideWeather = new Weather({
  city: 'Adelaide',
  coordinates: new Coordinates({
    latitude: -34.92,
    longitude: 138.62,
    altitude: 48,
  }),
  datetime: new Date('2016-01-03 12:35:37'),
  condition: Condition.SUNNY,
  temperature: 39.4,
  pressure: 1114.1,
  humidity: 12,
});

const melbourneWeather = new Weather({
  city: 'Melbourne',
  coordinates: new Coordinates({
    latitude: -37.83,
    longitude: 144.98,
    altitude: 7,
  }),
  datetime: new Date('2015-12-24 15:30:55'),
  condition: Condition.SNOW,
  temperature: -5.301,
  pressure: 998.4,
  humidity: 55,
});

describe('weather tests', () => {
  test('print weather props separated by vertical bars', () => {
    expect(sydneyWeather.toString()).toEqual('Sydney|-33.86,151.21,39|2015-12-23T05:02:12Z|Rain|+12.5|1004.3|97');
    expect(adelaideWeather.toString()).toEqual('Adelaide|-34.92,138.62,48|2016-01-03T12:35:37Z|Sunny|+39.4|1114.1|12');
    expect(melbourneWeather.toString()).toEqual('Melbourne|-37.83,144.98,7|2015-12-24T15:30:55Z|Snow|-5.3|998.4|55');
  });
});
