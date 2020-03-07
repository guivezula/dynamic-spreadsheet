import { Component, OnInit } from '@angular/core';
import { ControlType, Option, BaseType } from 'src/app/models/base-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectType } from 'src/app/models/select-type';
import { DateType } from 'src/app/models/date-type';
import { TextType } from 'src/app/models/text-type';
import { NumberType } from 'src/app/models/number-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public controls: string[] = [];
  public selectOptions: string[] = [];
  public form: FormGroup;
  public types: BaseType<string>[] = [];

  constructor(private fb: FormBuilder) { }

  /**
   * add type of control on component
   */
  public sendForm() {
    if (this.form.valid) {
      const option: Option<string> = this.form.getRawValue();
      this.createType(option);
    }
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
      label: [''],
      required: [false],
      controlType: ['', Validators.required],
      type: [''],
      options: [[]],
    });
  }

  /**
   * @param option is the given information typed
   * this function return the TypeBase according to controlType
   */
  private createType(option: Option<string>) {
    let type = null;
    switch (option.controlType) {
      case 'select':
        type = new SelectType({...option, options: this.selectOptions });
        break;
      case 'text':
        type = new TextType(option);
        break;
      case 'date':
        type = new DateType(option);
        break;
      case 'number':
        type = new NumberType(option);
        break;
    }
    this.types.push(type);
  }

  ngOnInit() {
    this.getControls();
    this.initForm();
  }

}
