import { Component, OnInit, ViewChild } from '@angular/core';
import { ControlType, Option, BaseType } from 'src/app/models/base-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectType } from 'src/app/models/select-type';
import { DateType } from 'src/app/models/date-type';
import { TextType } from 'src/app/models/text-type';
import { NumberType } from 'src/app/models/number-type';
import { of, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTypes, selectData, selectMinRows } from 'src/app/reducers/data-table/data-table.selectors';
import { updateTypes, updateTable, updateType, updateMinRows } from 'src/app/reducers/data-table/data-table.actions';

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
  public data$: Observable<any[]>;
  public minRows$: Observable<number>;

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
  public updateTableCell(data: any[]) {
    this.store.dispatch(updateTable({ data }));
  }

  /**
   * Update the column, and the data according to the new name
   * @param event receives the table emition
   */
  public updateTableTitle(event: { index: number, newName: string, data: any[] }) {
    this.updateTableCell(event.data);
    this.store.dispatch(updateType(event));
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
   * this function return the TypeBase according to controlType
   */
  private createType(option: Option) {
    let baseType = null;
    switch (option.controlType) {
      case 'select':
        baseType = new SelectType({...option, options: this.selectOptions });
        break;
      case 'text':
        baseType = new TextType(option);
        break;
      case 'date':
        baseType = new DateType(option);
        break;
      case 'number':
        baseType = new NumberType(option);
        break;
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
