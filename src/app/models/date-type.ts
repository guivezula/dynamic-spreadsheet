import { BaseType, ControlType, Options } from './base-type';

export class DateType extends BaseType<string> {
    controlType = ControlType.date;
    type: string;

    constructor(options: Options<string> = {}) {
      super(options);
      this.type = options.type || '';
    }
}
