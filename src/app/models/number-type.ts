import { BaseType, ControlType, Option } from './base-type';

export class NumberType extends BaseType<string> {
    controlType = ControlType.number;
    type: string;

    constructor(options: Option<string> = {}) {
      super(options);
      this.type = options.type || '';
    }
}
