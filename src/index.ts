const world = 'world';

export const hello = (word: string = world): string => {
  return `Hello ${word}!`;
};

console.log(hello(world));
