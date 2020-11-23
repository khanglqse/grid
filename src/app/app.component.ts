import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { DetailCellRenderer } from './detail-cell-renderer.component';

@Component({
  selector: 'app-root',
  template: `<ag-grid-angular
    #agGrid
    style="width: 100%; height: 500px;"
    id="myGrid"
    class="ag-theme-alpine"
    [masterDetail]="true"
    [detailCellRenderer]="detailCellRenderer"
    [frameworkComponents]="frameworkComponents"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> hello`,
})
export class AppComponent {
  public gridApi;
  public gridColumnApi;

  public detailCellRenderer;
  public frameworkComponents;
  public columnDefs;
  public defaultColDef;
  public rowData;

  constructor(private http: HttpClient) {
    this.detailCellRenderer = 'myDetailCellRenderer';
    this.frameworkComponents = { myDetailCellRenderer: DetailCellRenderer };
    this.columnDefs = [
      {
        field: 'name',
        cellRenderer: 'agGroupCellRenderer',
      },
      { field: 'account' },
      { field: 'calls' },
      {
        field: 'minutes',
        valueFormatter: "x.toLocaleString() + 'm'",
      },
    ];
    this.defaultColDef = { flex: 1 };
  }

  onFirstDataRendered(params) {
    params.api.forEachNode(function (node) {
      node.setExpanded(node.id === '1');
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        'https://raw.githubusercontent.com/ag-grid/ag-grid-docs/latest/src/javascript-grid-master-detail/custom-detail-with-form/data/data.json'
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}