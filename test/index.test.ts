import { hello } from '../lib/hello';

describe('index tests', () => {
  it('says hello', () => {
    const message = hello('World');
    expect(message).toEqual('Hello World!');
  });
});
