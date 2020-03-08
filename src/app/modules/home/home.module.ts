import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '../table/table.module';
import { StoreModule } from '@ngrx/store';
import * as fromTypes from './store/types/types.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TypesEffects } from './store/types/types.effects';

@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    StoreModule.forFeature(fromTypes.typesFeatureKey, fromTypes.reducer),
    EffectsModule.forFeature([TypesEffects]),
  ]
})
export class HomeModule { }
