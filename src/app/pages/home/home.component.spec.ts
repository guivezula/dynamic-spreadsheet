import { HomeComponent } from './home.component';
import { FormBuilder } from '@angular/forms';
import { async, TestBed, inject } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as fromData from '../../reducers';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fb: FormBuilder;
  let store: MockStore<fromData.State>;
  const initialState = { data: [], minRows: 5 };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Store },
        provideMockStore({ initialState }),
      ]
    }).compileComponents();

    store = TestBed.get(Store);
    fb = new FormBuilder();
    component = new HomeComponent(fb, store);
    component.ngOnInit();
    component.addSelectOption('test');
    component.addSelectOption('name');
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should count 1', () => {
    expect(component.selectOptions.length).toBe(2);
  });

  it('should contem item test', () => {
    expect(component.selectOptions).toContain('test');
  });

  it('should count 1', () => {
    component.removeSelectOption('name');
    expect(component.selectOptions.length).toBe(1);
  });

  let dispatchSpy;

  it('should dispatch actions', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    const data: any[] = [{ name: 'john' }];
    component.updateTableCell(data);
    component.updateMinRows(20);
    component.updateTableTitle({ index: 0, newName: 'test', data: [{ test: 'test' }] });

    expect(dispatchSpy).toHaveBeenCalledTimes(4);
  });
});
