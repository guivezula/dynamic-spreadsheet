import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BaseType, ControlType } from 'src/app/models/base-type';
import { TypeControlService } from 'src/app/services/type-control/type-control.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { takeLast, take } from 'rxjs/operators';
import * as R from 'ramda';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  @Input() types$: Observable<BaseType<string>[]> = of([]);
  @Input() data: any[];
  @Input() minRows: number;

  @Output() whenUpdateCell: EventEmitter<any[]> = new EventEmitter();
  @Output() whenUpdateTitle: EventEmitter<{index: number, newName: string, data: any[]}> = new EventEmitter();
  @Output() whenUpdateMinRows: EventEmitter<number> = new EventEmitter();

  public tableForm: FormGroup;

  private subscription: Subscription;

  constructor(
    private controlService: TypeControlService,
    private fb: FormBuilder,
  ) { }

  get frmArrayControls() { return (this.tableForm.get('data') as FormGroup).controls; }
  get controlType() { return ControlType; }

  public addRows(types: BaseType<string>[], from: number, til: number) {
    for (let index = from; index < til; index++) {
      const array = this.tableForm.get('data') as FormArray;
      array.push(this.controlService.toFormGroup(types));
    }
  }

  public updateTable() {
    const { data } = this.tableForm.getRawValue();
    this.whenUpdateCell.emit(data);
  }

  public updateColumnTitle(index: number, newName: string, oldName: string) {
    const newData = this.data.map(item => {
      const clone = R.clone(item);
      clone[newName] = clone[oldName];
      return clone;
    });
    this.data = newData;
    this.whenUpdateTitle.emit({ index, newName, data: newData});
  }

  public async updateMinRows() {
    const types = await this.types$.pipe(take(1)).toPromise();
    this.addRows(types, this.minRows, this.minRows + 10);
    this.whenUpdateMinRows.emit(this.minRows + 10);
  }

  private createFG(): FormGroup {
    return this.fb.group({
      data: this.fb.array([]),
    });
  }

  private initForm() {
    this.tableForm = this.createFG();
  }

  private updateTableData(types: BaseType<string>[]) {
    console.log(this.data);
    if (this.data.length) {
      const array = this.tableForm.get('data') as FormArray;
      this.data.forEach(item => {
        const index = this.data.indexOf(item);
        types.forEach(type => {
          if (item[type.name]) {
            array.get(index + `.${type.name}`).setValue(item[type.name]);
          }
        });
      });
    }
  }

  private changeFormStatus() {
    this.subscription = this.types$.subscribe((types: BaseType<string>[]) => {
      if (types.length) {
        this.initForm();
        this.addRows(types, 0, this.minRows);
        this.updateTableData(types);
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
