/**
 * Class to dynamically create a FormGroup
 */
export class BaseType {
    name: string;
    required: boolean;
    controlType: ControlType;
    options: string[];

    constructor(options: Option = {}) {
      this.name = options.name || '';
      this.required = !!options.required;
      this.options = options.options || [];
      this.controlType = options.controlType;
    }
}

export enum ControlType {
    'select',
    'number',
    'date',
    'text',
}

export interface Option {
    name?: string;
    required?: boolean;
    controlType?: ControlType;
    options?: string[];
}


