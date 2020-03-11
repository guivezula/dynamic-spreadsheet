import { BaseType, ControlType, Option } from './base-type';

export class SelectType extends BaseType {
    controlType = ControlType.select;
    options: string[];

    constructor(options: Option = {}) {
      super(options);
      this.options = options.options || [];
    }
}
