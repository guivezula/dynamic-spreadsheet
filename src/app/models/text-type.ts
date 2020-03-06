import { BaseType, ControlType, Option } from './base-type';

export class TextType extends BaseType<string> {
    controlType = ControlType.text;
    type: string;

    constructor(options: Option<string> = {}) {
      super(options);
      this.type = options.type || '';
    }
}
