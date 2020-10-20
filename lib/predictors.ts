import { EarthParameters } from './util/earthParameters';
import { Coordinates, Season, getSeason, Condition, Location, Weather } from './weather';

/**
 * This class predict the atmospheric pressure based on other factors
 *
 */
export abstract class PressurePredictor {
  /**
   * This function returns the predicted pressure at a certain altitude.
   * It is discarded the effect of the temperature on pressure as it is less
   * relevant than altitude for the temperature variation experienced on Earth.
   *
   * @param altitude altitude in meters
   * @return Atmospheric pressure in hPa
   */
  static predict(altitude: number): number {
    // Assuming linear
    const pressure =
      (altitude * (EarthParameters.PRESSURE_AT_MAX_ALTITUDE - EarthParameters.PRESSURE_AT_SEA_LEVEL)) /
        EarthParameters.MAX_ALTITUDE +
      EarthParameters.PRESSURE_AT_SEA_LEVEL;
    return pressure;
  }
}

/**
 * This class can be used to forecast temperature on earth
 */
export abstract class TemperaturePredictor {
  /**
   * Predict the temperature based on position and date
   *
   * @param coords location coordinates
   * @param date
   * @return temperature in Celsius
   */
  static predict(coords: Coordinates, date: Date): number {
    let temperature = EarthParameters.AVERAGE_TEMPERATURE_AT_ZERO_LATITUDE;

    // random factor between 0.8 to 1.2 to include other factors
    const randomFactor = 0.8 + (1.2 - 0.8) * Math.random();
    temperature *= randomFactor;

    const seasonFactor = this.seasonFactor(coords.latitude, date);
    temperature *= seasonFactor;

    const timeOfDayFactor = this.timeOfDayFactor(date);
    temperature *= timeOfDayFactor;

    const latitudeFactor = this.latitudeFactor(coords.latitude);
    temperature += latitudeFactor;

    const elevationFactor = this.altitudeFactor(coords.altitude);
    temperature += elevationFactor;

    return temperature;
  }

  static seasonFactor(latitude: number, date: Date): number {
    let seasonFactor;
    switch (getSeason(latitude, date)) {
      case Season.SUMMER:
        seasonFactor = 1.5;
        break;
      case Season.WINTER:
        seasonFactor = 0.25;
        break;
      default:
        seasonFactor = 1.0;
        break;
    }

    return seasonFactor;
  }

  /**
   * Drop temperature when is night time and increase during the day
   * The drop is higher greater when hour is close to midnight and
   * the increase is higher when is close to midday
   *
   * @param date
   * @return factor to multiply temperature
   */
  static timeOfDayFactor(date: Date): number {
    const hour = date.getHours();
    let timeOfDayFactor = 1.0;

    if (hour > 11 && hour < 14) {
      timeOfDayFactor = 1.2;
    }

    if (hour < 5 || hour > 23) {
      timeOfDayFactor = 0.8;
    }

    if (hour > 5 && hour < 7) {
      timeOfDayFactor = 0.9;
    }

    if (hour > 14 && hour < 16) {
      timeOfDayFactor = 1.1;
    }

    return timeOfDayFactor;
  }

  /**
   * For simplicity this function consider that temperature will drop 1C every
   * 5 degrees if |lat| < 30 1C every 3 degrees if 30 < |lat| < 60 1C every 2
   * degrees if |lat| > 90
   *
   * @param latitude latitude in degrees
   * @return temperature drop as negative number
   */
  static latitudeFactor(latitude: number): number {
    let drop = 0;
    let positiveLatitude = Math.abs(latitude);
    let dropFactor = 5;

    while (positiveLatitude > 0) {
      drop += Math.min(30.0, positiveLatitude) / dropFactor;
      positiveLatitude -= 30;
      dropFactor -= dropFactor / 2;
    }

    return -drop;
  }

  /**
   * For simplicity this function consider that temperature will drop 4
   * degrees every kilometer up
   *
   * @param altitude altitude in meters
   * @return temperature drop as negative number
   */
  static altitudeFactor(altitude: number): number {
    return (-altitude * 4) / 1000;
  }
}

/**
 * This class predict air humidity
 */
export abstract class HumidityPredictor {
  /**
   * This prediction consider that humidity are mainly dependent on pressure
   * and temperature Being inverse with pressure and exponential with
   * temperature. It is assumed for simplicity that humidity has a max of 100.
   *
   * @param pressure in hPan
   * @param temperature in Celsius
   * @return humidity in percent
   */
  static predict(pressure: number, temperature: number): number {
    // Random factor that should be improved to consider position
    let humidity = 80 * Math.random();

    // humidity is considered here to be inverse with pressure
    humidity *= 1 + (EarthParameters.PRESSURE_AT_SEA_LEVEL - pressure) / EarthParameters.PRESSURE_AT_SEA_LEVEL;

    // Approximating humidity to add an exponential factor for temperature
    humidity += Math.exp(0.1 * temperature);

    // limiting humidity by 100
    return Math.min(humidity, 100);
  }
}

/**
 * Generate condition based on the humidity and temperature
 */
export abstract class ConditionPredictor {
  /**
   * The prediction is modeled to be proportional to humidity
   *
   * @param humidity in %
   * @param temperature in Celsius
   * @return A weather condition
   */
  static predict(humidity: number, temperature: number): Condition {
    // Add random factor between 0.5 and 1.0
    const randomFactor = 0.5 + 0.5 * Math.random();

    // Chance of snow grows with humidity and with the decrease of
    // temperature
    const chanceOfSnow = temperature > -1 ? 0 : Math.min(humidity - temperature, 100) * randomFactor;
    if (chanceOfSnow > 40) {
      return Condition.SNOW;
    }

    // Chance of rain grows with humidity
    const chanceOfRain = humidity * randomFactor;
    if (chanceOfRain > 40) {
      return Condition.RAIN;
    }

    return Condition.SUNNY;
  }
}

/**
 * This class is responsible to populate weather objects with the prediction of
 * each of its properties generated by an appropriate predictor.
 */
export abstract class WeatherPredictor {
  /**
   * Given the location and date, it populates weather objects with the
   * prediction of each of its properties generated by an appropriate
   * predictor.
   *
   * @param location
   * @param date
   * @return the predicted weather.
   */
  static predict(location: Location, date: Date): Weather {
    const temperature = TemperaturePredictor.predict(location.coords, date);
    const pressure = PressurePredictor.predict(location.coords.altitude);
    const humidity = HumidityPredictor.predict(pressure, temperature);
    const condition = ConditionPredictor.predict(humidity, temperature);
    return new Weather({
      city: location.name,
      coordinates: location.coords,
      datetime: date,
      temperature,
      pressure,
      humidity,
      condition,
    });
  }
}
