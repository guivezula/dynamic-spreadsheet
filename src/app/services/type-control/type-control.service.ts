import { Injectable } from '@angular/core';
import { BaseType } from 'src/app/models/base-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TypeControlService {

  private fb: FormGroup;

  constructor() {
    const group: any = {};
    this.fb = new FormGroup(group);
  }

  public get formGroup() { return this.fb; }

  /**
   *
   * @param types
   * method get all the types and create the FormGroup
   */
  public toFormGroup(types: BaseType<string>[]) {
    const group: any = {};

    types.forEach(type => {
      group[type.key] = type.required ? new FormControl(type.value || '', Validators.required)
        : new FormControl(type.value || '');
    });
    this.fb = new FormGroup(group);
  }

  /**
   *
   * @param type
   * Method receive a type of column and add at the FormGroup as FormControl
   */
  public addControl(type: BaseType<string>): void {
    this.fb.addControl(type.key, type.required ? new FormControl(type.value || '', Validators.required)
      : new FormControl(type.value || ''));
  }
}
