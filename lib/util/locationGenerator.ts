import { EarthParameters } from './earthParameters';
import { Coordinates } from '../weather';
import generate from 'project-name-generator';

/**
 * Generate a number in range between min and max
 * @param min
 * @param max
 */
const generateNumber = (min: number, max: number): number => min + (max - min) * Math.random();

const rollDice = () => {
  const randomNumber = Math.floor(Math.random() * 6) + 1;
  return randomNumber;
};

export class Location {
  readonly name: string;
  readonly coords: Coordinates;
  constructor(name: string, coords: Coordinates) {
    this.name = name;
    this.coords = coords;
  }
}

export const generateLocation = (): Location => {
  const name = generate({ words: rollDice(), number: false })
    .raw.map((s) => s.toString().charAt(0).toUpperCase() + s.toString().slice(1))
    .join(' ');
  const latitude = generateNumber(-90.0, 90.0);
  const longitude = generateNumber(-180.0, 180.0);
  let altitude = generateNumber(0, 2 * EarthParameters.AVERAGE_ALTITUDE);
  if (rollDice() === 6) {
    altitude = generateNumber(0, EarthParameters.MAX_ALTITUDE);
  }
  return new Location(name, new Coordinates({ latitude, longitude, altitude }));
};
