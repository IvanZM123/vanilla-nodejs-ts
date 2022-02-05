export interface ConverterStrategy {
  convert(content: any): Promise<any>;
}

export class Converter {
  async convertFile(content: any, strategy: ConverterStrategy) {
    return strategy.convert(content);
  }
}
