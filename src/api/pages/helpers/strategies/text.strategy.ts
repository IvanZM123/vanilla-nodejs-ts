import { ConverterStrategy } from "../converter";

export class TextStrategy implements ConverterStrategy {
  async convert(content: string): Promise<string> {
    return content;
  }
}
