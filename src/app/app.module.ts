import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DetailCellRenderer } from './detail-cell-renderer.component';
import {AgGridModule} from 'ag-grid-angular'
import 'ag-grid-enterprise'
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    DetailCellRenderer,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([DetailCellRenderer])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
