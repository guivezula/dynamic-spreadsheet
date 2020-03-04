import { BaseType, ControlType, Options } from './base-type';

export class TextType extends BaseType<string> {
    controlType = ControlType.text;
    type: string;

    constructor(options: Options<string> = {}) {
      super(options);
      this.type = options.type || '';
    }
}
