import dateFormat from 'dateformat';

export enum Condition {
  RAIN = 'Rain',
  SNOW = 'Snow',
  SUNNY = 'Sunny',
}

export interface CoordinatesProps {
  readonly altitude: number;
  readonly latitude: number;
  readonly longitude: number;
}

export class Coordinates {
  readonly altitude: number;
  readonly latitude: number;
  readonly longitude: number;
  constructor(props: CoordinatesProps) {
    this.latitude = props.latitude;
    this.longitude = props.longitude;
    this.altitude = props.altitude;
  }
  toString = (): string => `${this.latitude.toFixed(2)},${this.longitude.toFixed(2)},${this.altitude.toFixed(0)}`;
}

export interface LocationProps {
  readonly name: string;
  readonly coords: Coordinates;
}

export class Location {
  readonly name: string;
  readonly coords: Coordinates;
  constructor(props: LocationProps) {
    this.name = props.name;
    this.coords = props.coords;
  }
}

export interface WeatherProps {
  readonly city: string;
  readonly coordinates: Coordinates;
  readonly datetime: Date;
  readonly condition: Condition;
  readonly temperature: number;
  readonly pressure: number;
  readonly humidity: number;
}

export class Weather {
  readonly city: string;
  readonly coordinates: Coordinates;
  readonly datetime: Date;
  readonly condition: Condition;
  readonly temperature: number;
  readonly pressure: number;
  readonly humidity: number;

  constructor(props: WeatherProps) {
    this.city = props.city;
    this.coordinates = props.coordinates;
    this.datetime = props.datetime;
    this.condition = props.condition;
    this.temperature = props.temperature;
    this.pressure = props.pressure;
    this.humidity = props.humidity;
  }
  /**
   * Used to print all the fields separated by vertical bars | E.g.
   * Sydney|-33.86,151.21,39|2015-12-23T05:02:12Z|Rain|+12.5|1004.3|97
   */
  toString = (): string =>
    `${this.city}|\
${this.coordinates.toString()}|\
${dateFormat(this.datetime, "yyyy-mm-dd'T'HH:MM:ss'Z'")}|\
${this.condition}|\
${this.temperature < 0 ? '' : '+'}${this.temperature.toFixed(1)}|\
${this.pressure.toFixed(1)}|\
${this.humidity.toFixed(0)}`;
}

/**
 * Weather Season
 */
export enum Season {
  WINTER,
  SPRING,
  SUMMER,
  AUTUMN,
}

/**
 * Get the opposite weather season
 *
 * @param season
 */
export const opositeSeason = (season: Season): Season => {
  let opposite;
  switch (season) {
    case Season.AUTUMN:
      opposite = Season.SPRING;
      break;
    case Season.SPRING:
      opposite = Season.AUTUMN;
      break;
    case Season.SUMMER:
      opposite = Season.WINTER;
      break;
    case Season.WINTER:
      opposite = Season.SUMMER;
      break;
    default:
      opposite = season;
      break;
  }
  return opposite;
};

/**
 * Find the weather season using a month rounding strategy as Australia
 *
 * @param latitude
 * @param date
 * @return
 */
export const getSeason = (latitude: number, date: Date): Season => {
  const month = date.getMonth();
  const aussieSeasons: Season[] = [
    Season.SUMMER,
    Season.SUMMER,
    Season.AUTUMN,
    Season.AUTUMN,
    Season.AUTUMN,
    Season.WINTER,
    Season.WINTER,
    Season.WINTER,
    Season.SPRING,
    Season.SPRING,
    Season.SPRING,
    Season.SUMMER,
  ];
  if (latitude < 0) {
    return aussieSeasons[month];
  }
  return opositeSeason(aussieSeasons[month]);
};
