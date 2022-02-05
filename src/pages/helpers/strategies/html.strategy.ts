import { ConverterStrategy } from "../converter";
import { Converter } from "showdown";

export class HtmlStrategy implements ConverterStrategy {
  async convert(content: string): Promise<any> {
    const converter = new Converter();
    return converter.makeHtml(content);
  }
}
