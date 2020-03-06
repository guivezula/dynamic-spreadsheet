/**
 * Class to dynamically create a FormGroup
 */
export class BaseType<T> {
    value: T;
    name: string;
    label: string;
    required: boolean;
    controlType: ControlType;
    type: string;
    options: string[];

    constructor(options: Options<T> = {}) {
      this.value = options.value;
      this.name = options.name || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.controlType = options.controlType;
      this.type = options.type || '';
      this.options = options.options || [];
    }
}

export enum ControlType {
    'select',
    'number',
    'date',
    'text',
}

export interface Options<T> {
    value?: T;
    name?: string;
    label?: string;
    required?: boolean;
    controlType?: ControlType;
    type?: string;
    options?: string[];
}


