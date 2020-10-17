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
  toString = (): string => `${this.latitude},${this.longitude},${this.altitude}`;
}

export interface WeatherProps {
  readonly location: string;
  readonly coordinates: Coordinates;
  readonly datetime: Date;
  readonly condition: Condition;
  readonly temperature: number;
  readonly pressure: number;
  readonly humidity: number;
}

export class Weather {
  /*
   * Location is an optional label describing one or more positions, Position
   * is a comma-separated triple containing latitude, longitude, and elevation
   * in meters above sea level, Local time is an ISO8601 date time, Conditions
   * is either Snow, Rain, Sunny, Temperature is in °C, Pressure is in hPa,
   * and Relative humidity is a %.
   */
  private readonly location: string;
  private readonly coordinates: Coordinates;
  private readonly datetime: Date;
  private readonly condition: Condition;
  private readonly temperature: number;
  private readonly pressure: number;
  private readonly humidity: number;

  constructor(props: WeatherProps) {
    (this.location = props.location),
      (this.coordinates = props.coordinates),
      (this.datetime = props.datetime),
      (this.condition = props.condition),
      (this.temperature = props.temperature),
      (this.pressure = props.pressure),
      (this.humidity = props.humidity);
  }
  /**
   * Used to print all the fields separated by vertical bars | E.g.
   * Sydney|-33.86,151.21,39|2015-12-23T05:02:12Z|Rain|+12.5|1004.3|97
   */
  toString = (): string =>
    `${this.location}|\
${this.coordinates.toString()}|\
${dateFormat(this.datetime, "yyyy-mm-dd'T'HH:MM:ss'Z'")}|\
${this.condition}|\
${this.temperature < 0 ? '' : '+'}${this.temperature.toFixed(1)}|\
${this.pressure}|\
${this.humidity}`;
}
