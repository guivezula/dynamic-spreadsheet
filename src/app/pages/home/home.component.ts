import { Component, OnInit } from '@angular/core';
import { ControlType, Option, BaseType } from 'src/app/models/base-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTypes, selectData, selectMinRows } from 'src/app/reducers/data-table/data-table.selectors';
import { updateTypes, updateTableTitle, updateMinRows, registerItem } from 'src/app/reducers/data-table/data-table.actions';
import { DataItem } from 'src/app/models/data';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public controls: string[] = [];
  public selectOptions: string[] = [];
  public form: FormGroup;
  public types$: Observable<BaseType[]>;
  public data$: Observable<DataItem[]>;
  public minRows$: Observable<number>;
  public controlTypeEnum = ControlType;

  constructor(private fb: FormBuilder, private store: Store<any>) { }

  /**
   * add type of control on component
   */
  public sendForm() {
    if (this.form.valid) {
      const option: Option = this.form.getRawValue();
      this.createType(option);
    }
    this.form.reset();
  }

  /**
   * @param option receive an option and add on the list
   */
  public addSelectOption(option: string) {
    if (option === '') { return; }
    this.selectOptions.push(option);
  }

  /**
   * @param option remove an option from the list
   */
  public removeSelectOption(option: string) {
    if (!option) { return; }
    const index = this.selectOptions.indexOf(option);
    this.selectOptions.splice(index, 1);
  }

  /**
   * Receive the table emition and update the local storage
   * @param data is the last updated data
   */
  public updateTableCell(item: DataItem) {
    this.store.dispatch(registerItem({ item }));
  }

  /**
   * Update the column, and the data according to the new name
   * @param event receives the table emition
   */
  public updateTableTitle(event: { index: number, title: string, updatedData: Update<DataItem>[]}) {
    this.store.dispatch(updateTableTitle(event));
  }

  /**
   * Update the minimum of rows on local storage
   * @param minRows is  the emitted value from table
   */
  public updateMinRows(minRows: number) {
    this.store.dispatch(updateMinRows({ minRows }));
  }

  /**
   * map enum to array
   */
  private getControls() {
    this.controls = Object.keys(ControlType).filter(value => isNaN(parseInt(value, 0)));
  }

  /**
   * Init columns form
   */
  private initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      required: [false],
      controlType: ['', Validators.required],
      options: [[]],
    });
  }

  /**
   * @param option is the given information typed
   * this function create a type according to option
   */
  private createType(option: Option) {
    let baseType = new BaseType(option);
    if (!!this.selectOptions.length) {
      baseType = { ...baseType, options: this.selectOptions };
      this.selectOptions = [];
    }
    this.store.dispatch(updateTypes({ baseType }));
  }

  /**
   * Get saved information on local storage
   */
  private getStates() {
    this.types$ = this.store.select(selectTypes);
    this.data$ = this.store.select(selectData);
    this.minRows$ = this.store.select(selectMinRows);
  }

  ngOnInit() {
    this.getControls();
    this.initForm();
    this.getStates();
  }

}
