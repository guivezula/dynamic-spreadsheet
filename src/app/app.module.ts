import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

// Ngrx
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers, effects } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot(effects),
    NgxMaskModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
