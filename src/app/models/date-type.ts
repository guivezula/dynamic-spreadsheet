import { BaseType, ControlType, Option } from './base-type';

export class DateType extends BaseType {
    controlType = ControlType.date;

    constructor(options: Option = {}) {
      super(options);
    }
}
