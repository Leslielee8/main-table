import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainTableComponent } from './main-table/main-table.component';

const routes: Routes = [
  { path: 'main-table', component: MainTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
