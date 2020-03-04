/**
 * Class to dynamically create a FormGroup
 */
export class BaseType<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: ControlType;
    type: string;
    options: {key: string, value: string}[];

    constructor(options: Options<T> = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
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
    key?: string;
    label?: string;
    required?: boolean;
    order?: number;
    controlType?: ControlType;
    type?: string;
    options?: {key: string, value: string}[];
}


