import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableViewComponent } from './table-view/table-view.component';
import { LineChartComponent } from './line-chart/line-chart.component';

const routes: Routes = [{ path: '', redirectTo: '/table', pathMatch: 'full' },
{ path: 'table', component: TableViewComponent },
{ path: 'viewCountries/:continentNum', component: LineChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
