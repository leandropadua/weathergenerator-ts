import { hello } from '../src';

describe('index tests', () => {
  it('says hello', () => {
    const message = hello('World');
    expect(message).toEqual('Hello World!');
  });
});
