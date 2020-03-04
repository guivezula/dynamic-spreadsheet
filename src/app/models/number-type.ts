import { BaseType, ControlType, Options } from './base-type';

export class NumberType extends BaseType<string> {
    controlType = ControlType.number;
    type: string;

    constructor(options: Options<string> = {}) {
      super(options);
      this.type = options.type || '';
    }
}
