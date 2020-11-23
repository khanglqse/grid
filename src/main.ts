import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {LicenseManager} from 'ag-grid-enterprise'

if (environment.production) {
  enableProdMode();
}
LicenseManager.setLicenseKey("For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-23_January_2021_[v2]_MTYxMTM2MDAwMDAwMA==c6fdeb8099346e28557867a8e1945d3e");

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
