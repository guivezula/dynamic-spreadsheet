import { BaseType, ControlType, Option } from './base-type';

export class NumberType extends BaseType {
    controlType = ControlType.number;

    constructor(options: Option = {}) {
      super(options);
    }
}
