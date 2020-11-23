import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-detail-cell-renderer',
  template: `
    <div class='cell-container'>
    <h5>Children load</h5>
    <ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    id="myGrid"
    [rowData]="rowData"
    [columnDefs]="columnDefs"
>
</ag-grid-angular>
</div>

  `,
})
export class DetailCellRenderer implements ICellRendererAngularComp {
  columnDefs = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' }
  ];
  rowData = [];
  agInit(params: any): void {
    setTimeout(() => {
      this.rowData = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
      ];
    }, 1000);
  }

  refresh(params: any): boolean {
    return false;
  }

}
