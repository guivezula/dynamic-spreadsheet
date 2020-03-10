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

  /** get to return the controls of the form array */
  get frmArrayControls() { return (this.tableForm.get('data') as FormGroup).controls; }

  /** return the control type to be compared on html */
  get controlType() { return ControlType; }

  /**
   * this method receive the params initializating adding rows accoring to
   * @param types the list of types created
   * @param from the initial index of rows to be created
   * @param til the number of rows
   */
  public addRows(types: BaseType<string>[], from: number, til: number) {
    for (let index = from; index < til; index++) {
      const array = this.tableForm.get('data') as FormArray;
      array.push(this.controlService.toFormGroup(types));
    }
  }

  /**
   * The method which emits the last data from the form
   */
  public updateTable() {
    const { data } = this.tableForm.getRawValue();
    this.whenUpdateCell.emit(data);
  }

  /**
   * this method adds to the array a new attribute based on
   * @param index which is the column changed
   * @param newName which is the new control name, and
   * @param oldName which allows not to loose the saved data field
   * it also emits it to the home page to add it all on local storage
   */
  public updateColumnTitle(index: number, newName: string, oldName: string) {
    const newData = this.data.map(item => {
      const clone = R.clone(item);
      clone[newName] = clone[oldName];
      return clone;
    });
    this.data = newData;
    this.whenUpdateTitle.emit({ index, newName, data: newData});
  }

  /**
   * Method to update the minimun of Rows and emits it to the page
   */
  public async updateMinRows() {
    const types = await this.types$.pipe(take(1)).toPromise();
    this.addRows(types, this.minRows, this.minRows + 10);
    this.whenUpdateMinRows.emit(this.minRows + 10);
  }

  /**
   * It creates the form array
   */
  private createFG(): FormGroup {
    return this.fb.group({
      data: this.fb.array([]),
    });
  }

  /**
   * Init the form group
   */
  private initForm() {
    this.tableForm = this.createFG();
  }

  /**
   * Method to receive
   * @param types and the last data saved on local storage
   * to update this values on the table when it adds a new column
   */
  private updateTableData(types: BaseType<string>[]) {
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

  /**
   * Method created to observe the type changes, to update the form
   * everytime a new column is created
   */
  private changeFormStatus() {
    this.subscription = this.types$.subscribe((types: BaseType<string>[]) => {
      if (types.length) {
        this.initForm();
        this.addRows(types, 0, this.minRows);
        this.updateTableData(types);
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
