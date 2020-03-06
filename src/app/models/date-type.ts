import { BaseType, ControlType, Option } from './base-type';

export class DateType extends BaseType<string> {
    controlType = ControlType.date;
    type: string;

    constructor(options: Option<string> = {}) {
      super(options);
      this.type = options.type || '';
    }
}
