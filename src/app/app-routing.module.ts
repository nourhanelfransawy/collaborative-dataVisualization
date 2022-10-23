import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableViewComponent } from './table-view/table-view.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { LineChart2Component } from './line-chart2/line-chart2.component';
const routes: Routes = [{ path: '', redirectTo: '/table', pathMatch: 'full' },
{ path: 'table', component: TableViewComponent },
{ path: 'viewEuropeCountries', component: LineChartComponent },
{ path: 'viewAfricaCountries', component: LineChart2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
