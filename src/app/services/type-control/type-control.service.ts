import { Injectable } from '@angular/core';
import { BaseType } from 'src/app/models/base-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeControlService {

  constructor() {}

  /**
   *
   * @param types
   * method get all the type of columns and create the FormGroup
   */
  public toFormGroup(types: BaseType[]): FormGroup {
    const group: any = {};

    types.forEach(type => {
      group[type.name] = type.required ? new FormControl('', Validators.required)
        : new FormControl('');
    });
    return new FormGroup(group);
  }

}
