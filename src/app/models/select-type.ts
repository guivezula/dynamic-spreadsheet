import { BaseType, ControlType, Option } from './base-type';

export class SelectType extends BaseType<string> {
    controlType = ControlType.select;
    options: string[];

    constructor(options: Option<string> = {}) {
      super(options);
      this.options = options.options || [];
    }
}
