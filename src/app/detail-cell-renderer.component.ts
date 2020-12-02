import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import {FakeServer} from './fakeServer'
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
@Component({
  selector: 'app-detail-cell-renderer',
  template: `
    <div class='cell-container'>
      {{parent?.name}} children data
      <ag-grid-angular
      #agGrid
      style="width: 100%; height: 75%;"
      id="myGrid"
      class="ag-theme-alpine-dark"
      [modules]="modules"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowModelType]="rowModelType"
      [pagination]="true"
      [paginationPageSize]="paginationPageSize"
      [suppressAggFuncInHeader]="true"
      [cacheBlockSize]="10"
      [animateRows]="true"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>

    </div>
    
  `,
})
export class DetailCellRenderer implements ICellRendererAngularComp {
  gridApi;
  gridColumnApi;
  parent;
  public modules = [
    ServerSideRowModelModule,
    MenuModule,
    ColumnsToolPanelModule,
  ];
  columnDefs;
  defaultColDef;
  rowModelType;
  paginationPageSize;
  cacheBlockSize;
  rowData: [];

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        field: 'id',
        maxWidth: 75,
      },
      {
        field: 'athlete',
        minWidth: 190,
      },
      { field: 'age' },
      { field: 'year' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 90,
      resizable: true,
    };
    this.rowModelType = 'serverSide';
    this.paginationPageSize = 10;
    this.cacheBlockSize = 10;
  }
  refresh(params: any): boolean {
    return false;
  }
  agInit(params: ICellRendererParams): void {
    this.parent = params.data
  }
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json'
      )
      .subscribe((data: any) => {
        var idSequence = 1;
        data.forEach(function (item) {
          item.id = idSequence++;
        });
        var fakeServer = FakeServer(data);
        var datasource = ServerSideDatasource(fakeServer);
        params.api.setServerSideDatasource(datasource);
      });
  }
}

function ServerSideDatasource(server) {
  return {
    getRows: function (params) {
      console.log('[Datasource] - rows requested by grid: ', params.request);
      var response = server.getData(params.request);
      setTimeout(function () {
        if (response.success) {
          params.successCallback(response.rows, response.lastRow);
        } else {
          params.failCallback();
        }
      }, 200);
    },
  };
}
