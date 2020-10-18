import { hello } from '../lib/hello';
import { generateLocation } from '../lib/util/locationGenerator';

const world = 'world';
const location = generateLocation();
console.log(location);
console.log(hello(world));
