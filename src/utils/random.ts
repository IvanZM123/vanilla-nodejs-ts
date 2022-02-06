import { loremIpsum, ILoremIpsumParams } from "lorem-ipsum";

export function generateRandomText(): string {
  const options: ILoremIpsumParams = {
    count: 15,
    paragraphLowerBound: 3,
    paragraphUpperBound: 15,
    random: Math.random,
    sentenceLowerBound: 3,
    sentenceUpperBound: 50
  };

  return loremIpsum(options).split(".").join("\n\n");
}

export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

