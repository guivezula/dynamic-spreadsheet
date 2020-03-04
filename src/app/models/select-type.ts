import { BaseType, ControlType, Options } from './base-type';

export class SelectType extends BaseType<string> {
    controlType = ControlType.select;
    options: {key: string, value: string}[] = [];

    constructor(options: Options<string> = {}) {
      super(options);
      this.options = options.options || [];
    }
}
