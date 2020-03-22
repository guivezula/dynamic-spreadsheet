import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BaseType, ControlType } from 'src/app/models/base-type';
import { TypeControlService } from 'src/app/services/type-control/type-control.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { DataItem } from 'src/app/models/data';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  @Input() types$: Observable<BaseType[]> = of([]);
  @Input() data$: Observable<DataItem[]>;
  @Input() minRows: number;

  @Output() whenUpdateCell: EventEmitter<DataItem> = new EventEmitter();
  @Output() whenUpdateTitle: EventEmitter<{index: number, title: string, updatedData: Update<DataItem>[]}> = new EventEmitter();
  @Output() whenUpdateMinRows: EventEmitter<number> = new EventEmitter();

  public tableForm: FormGroup;

  private subscription: Subscription;
  private readonly MINIMUM_ROWS_NUMBER = 10;

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
  public addRows(types: BaseType[], from: number, til: number) {
    for (let index = from; index < til; index++) {
      const array = this.tableForm.get('data') as FormArray;
      array.push(this.controlService.toFormGroup(types));
    }
  }

  /**
   * The method which emits an item to be added on localstorage
   */
  public updateTable(index: number, column: string, value: any): void {
    if (value === '') { return; }
    const item: DataItem = { index, column, value };
    this.whenUpdateCell.emit(item);
  }

  /**
   * this method adds to the array a new column name based on
   * @param index which is the column changed
   * @param title which is the new control name, and
   * @param oldTitle which allows not to loose the saved data field
   * it also emits it to the home page to update it on localstorage
   */
  public async updateColumnTitle(index: number, title: string, oldTitle: string) {
    const data = await this.data$.pipe(take(1)).toPromise();
    const oldData = data.filter(item => item.column === oldTitle);
    const updatedData: Update<DataItem>[] = oldData.map(item => ({ id: `${item.index}.${item.column}`, changes: { column: title } }));
    this.whenUpdateTitle.emit({ index, title, updatedData });
  }

  /**
   * Method to update the minimum of Rows and emits it to the page
   */
  public async updateMinRows() {
    const updatedMinRows = this.minRows + this.MINIMUM_ROWS_NUMBER;
    const types = await this.types$.pipe(take(1)).toPromise();
    this.addRows(types, this.minRows, updatedMinRows);
    this.whenUpdateMinRows.emit(updatedMinRows);
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
   * Method to update table values based o data every time a new column is added
   */
  private async updateTableData() {
    const data = await this.data$.pipe(take(1)).toPromise();
    if (!!data.length) {
      const array = this.tableForm.get('data') as FormArray;
      data.forEach(item => {
        array.get(item.index + `.${item.column}`).setValue(item.value);
      });
    }
  }

  /**
   * Method created to observe the type changes, to update the form
   * everytime a new column is created
   */
  private changeFormStatus() {
    this.subscription = this.types$.subscribe(async (types: BaseType[]) => {
      if (types.length) {
        this.initForm();
        this.addRows(types, 0, this.minRows);
        await this.updateTableData();
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
