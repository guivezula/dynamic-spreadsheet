import { BaseType, ControlType, Option } from './base-type';

export class TextType extends BaseType {
    controlType = ControlType.text;

    constructor(options: Option = {}) {
      super(options);
    }
}
