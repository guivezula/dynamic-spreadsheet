import { async } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { FormBuilder } from '@angular/forms';
import { TypeControlService } from 'src/app/services/type-control/type-control.service';

describe('TableComponent', () => {
  let component: TableComponent;
  let fb: FormBuilder;
  let service: TypeControlService;

  beforeEach(async(() => {
    fb = new FormBuilder();
    service = new TypeControlService();
    component = new TableComponent(service, fb);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
