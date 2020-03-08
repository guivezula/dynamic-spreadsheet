import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BaseType } from 'src/app/models/base-type';
import { TypeControlService } from 'src/app/services/type-control/type-control.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  @Input() types$: Observable<BaseType<string>[]> = of([]);

  public tableForm: FormGroup;

  private minRows = 10;
  private subscription: Subscription;

  constructor(
    private controlService: TypeControlService,
    private fb: FormBuilder,
  ) { }

  get frmArrayControls() { return (this.tableForm.get('data') as FormGroup).controls; }

  public addRows(types: BaseType<string>[]) {
    for (let index = 0; index < this.minRows; index++) {
      const array = this.tableForm.get('data') as FormArray;
      array.push(this.controlService.toFormGroup(types));
    }
  }

  private createFG(): FormGroup {
    return this.fb.group({
      data: this.fb.array([]),
    });
  }

  private initForm() {
    this.tableForm = this.createFG();
  }

  private changeFormStatus() {
    this.subscription = this.types$.subscribe((types: BaseType<string>[]) => {
      if (types.length) {
        this.initForm();
        this.addRows(types);
        console.log(this.tableForm);
      }
    });
  }

  ngOnInit() {
    this.changeFormStatus();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
