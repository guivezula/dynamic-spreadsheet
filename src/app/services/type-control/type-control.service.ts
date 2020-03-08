import { Injectable } from '@angular/core';
import { BaseType } from 'src/app/models/base-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

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
  public toFormGroup(types: BaseType<string>[]): FormGroup {
    const group: any = {};

    types.forEach(type => {
      group[type.name] = type.required ? new FormControl(type.value || '', Validators.required)
        : new FormControl(type.value || '');
    });
    return new FormGroup(group);
  }

  /**
   *
   * @param type
   * Method receive a type of column and add at the FormGroup as FormControl
   */
  public addControl(type: BaseType<string>): void {
    this.fb.addControl(type.name, type.required ? new FormControl(type.value || '', Validators.required)
      : new FormControl(type.value || ''));
  }

  public updateControleKey(newKey: string, oldKey: string) {
    const control = this.fb.get(oldKey);
    this.fb.removeControl(oldKey);
    this.fb.addControl(newKey, control);
  }

  /**
   *
   * @param type
   * Method receive the list of types to return a boservable
   */
  public getObsTypes(types: BaseType<string>[]): Observable<BaseType<string>[]> {
    return of(types);
  }

}
